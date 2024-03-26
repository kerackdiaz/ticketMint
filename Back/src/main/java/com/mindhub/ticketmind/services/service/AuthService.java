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
            helper.setSubject("Verificación de cuenta");
            helper.setText("<html><body><h1>Por favor, haga clic en el siguiente enlace para verificar su cuenta:</h1><a href='http://tudominio.com/verificar?email=" + client.getEmail() + "'>Verificar cuenta</a></body></html>", true);
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
