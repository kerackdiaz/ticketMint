package com.mindhub.ticketmind.services.service;

import com.mindhub.ticketmind.dtos.LoginDTO;
import com.mindhub.ticketmind.dtos.RegisterDTO;
import com.mindhub.ticketmind.models.Client;
import com.mindhub.ticketmind.models.UserRole;
import com.mindhub.ticketmind.repositories.ClientRepository;
import com.mindhub.ticketmind.services.JwtUtilService;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtilService jwtUtilService;

    @Autowired
    private ClientService clientService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private JavaMailSender javaMailSender;





    public Map<String, Object> login(LoginDTO loginDTO) {
        Map<String, Object> response = new HashMap<>();
        if(loginDTO.email().isBlank() ){
            response.put("error", false);
            response.put("message", "the email are empty");
            return response;
        }
        if( loginDTO.password().isBlank()){
            response.put("error", false);
            response.put("message", "the password are empty");
            return response;
        }
        if (!clientRepository.existsByEmail(loginDTO.email())) {
            response.put("error", false);
            response.put("message", "User not found");
            return response;
        }
        Client client = clientRepository.findByEmail(loginDTO.email());
        if (!client.isStatus()) {
            response.put("error", false);
            response.put("message", "This account is deactivated");
            return response;
        }
        if (!passwordEncoder.matches(loginDTO.password(), client.getPassword())) {
            response.put("error", false);
            response.put("message", "Incorrect password");
            return response;
        }
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.email(), loginDTO.password()));
            final UserDetails userDetails = userDetailsService.loadUserByUsername(loginDTO.email());
            final String jwt = jwtUtilService.generateToken(userDetails);

            response.put("success", true);
            response.put("token", jwt);
        }catch(Exception e){
            response.put("error", false);
            response.put("message", "Incorrect");
        }
        return response;
    }

    public Map<String, Object> register(RegisterDTO registerDTO, String role) {
        Map<String, Object> response = new HashMap<>();
        try {

            if (registerDTO.firstName().isBlank()) {
                response.put("error", false);
                response.put("message", "First name cannot be blank");
                return response;
            }
            if ( registerDTO.lastName().isBlank()) {
                response.put("error", false);
                response.put("message", "Last name cannot be blank");
                return response;
            }
            if (registerDTO.email().isBlank()) {
                response.put("error", false);
                response.put("message", "Email cannot be blank");
                return response;
            }
            if (clientRepository.existsByEmail(registerDTO.email())) {
                response.put("success", false);
                response.put("message", "Email already in use");
                return response;
            }
            if (registerDTO.password().isBlank()) {
                response.put("error", false);
                response.put("message", "Password cannot be blank");
                return response;
            }

            if (registerDTO.password().length() < 8) {
                response.put("error", false);
                response.put("message", "Password must be at least 8 characters long");
                return response;
            }
            if (!registerDTO.password().matches(".*\\d.*")) {
                response.put("error", false);
                response.put("message", "Password must contain at least one number");
                return response;
            }
            if (!registerDTO.password().matches(".*[a-z].*")) {
                response.put("error", false);
                response.put("message", "Password must contain at least one lowercase letter");
                return response;
            }

            if (!registerDTO.password().matches(".*[A-Z].*")) {
                response.put("error", false);
                response.put("message", "Password must contain at least one uppercase letter");
                return response;
            }

            Client client = new Client(registerDTO.email(), registerDTO.firstName(), registerDTO.lastName(), passwordEncoder.encode(registerDTO.password()), UserRole.valueOf(role));
            clientRepository.save(client);

            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            helper.setFrom("ticketMint@3mas1r.com");
            helper.setTo(client.getEmail());
            helper.setSubject("Account verification");
            helper.setText("<html><body><table style=\"border-collapse: collapse; width: 100%; height: 58px;\" border=\"1\">\n" +
                    "  <tbody>\n" +
                    "    <tr style=\"height: 58px;\">\n" +
                    "      <td style=\"width: 72.3514%; height: 58px; border:none; text-align: center;\">\n" +
                    "        <span style=\"font-size: 36pt; font-family: impact, sans-serif;\">Hi " + client.getFirstname() + ", Welcome to</span>\n" +
                    "      </td>\n" +
                    "      <td style=\"width: 27.6486%; height: 58px; border:none;\">\n" +
                    "        <img src=\"https://firebasestorage.googleapis.com/v0/b/homebankingapp-4b70f.appspot.com/o/ticketmint%2Fmailassets%2FticketmintLogo.png?alt=media&amp;token=e1c414f3-41e6-4da1-a5b8-7b63e3013612\" alt=\"\" width=\"101\" height=\"101\">\n" +
                    "      </td>\n" +
                    "    </tr>\n" +
                    "  </tbody>\n" +
                    "</table>\n" +
                    "<br>\n" +
                    "<table style=\"border-collapse: collapse; width: 100%;\" border=\"1\">\n" +
                    "  <tbody>\n" +
                    "    <tr>\n" +
                    "      <td style=\"width: 50%; border:none\">\n" +
                    "        <img src=\"https://firebasestorage.googleapis.com/v0/b/homebankingapp-4b70f.appspot.com/o/ticketmint%2Fmailassets%2FbannerTicket.png?alt=media&amp;token=1f680708-41ec-4333-bdec-c8e5e3f56ca0\" alt=\"\" width=\"391\" height=\"418\">\n" +
                    "        <br>\n" +
                    "      </td>\n" +
                    "      <td style=\"width: 50%; text-align: center;  border:none\">\n" +
                    "        <span style=\"font-family: tahoma, arial, helvetica, sans-serif; font-size: 18pt;\">Don't waste any more time! Activate your account right now and discover a world of possibilities waiting for you, click here to start enjoying all our exclusive services!\n" +
                    "          <br>\n" +
                    "          <br>\n" +
                    "          <a href=\"https://ticketmint.onrender.com/api//verifyAccount?email=" + client.getEmail() + "' target=\"_blank\" class=\"cloudHQ__gmail_elements_final_btn\" style=\"background-color: #55347b; color: #ffffff; border: 0px solid #000000; border-radius: 3px; box-sizing: border-box; font-size: 13px; font-weight: bold; line-height: 40px; padding: 12px 24px; text-align: center; text-decoration: none; text-transform: uppercase; vertical-align: middle;\" rel=\"noopener\">Activate now</a>\n" +
                    "          <br>\n" +
                    "        </span>\n" +
                    "      </td>\n" +
                    "    </tr>\n" +
                    "  </tbody>\n" +
                    "</table></body></html>", true);
            javaMailSender.send(mimeMessage);

            response.put("success", true);
            response.put("message", "Successfully registered");
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "An error occurred while registering: " + e.getMessage());
        }
        return response;
    }



}
