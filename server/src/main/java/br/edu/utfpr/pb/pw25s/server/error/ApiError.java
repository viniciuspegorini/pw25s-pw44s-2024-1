package br.edu.utfpr.pb.pw25s.server.error;

import lombok.*;

import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApiError {
    private int status;
    private String message;
    private String url;
    private Map<String, String> validationErrors;
}
