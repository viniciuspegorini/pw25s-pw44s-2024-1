package br.edu.utfpr.pb.pw25s.server.error;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.Date;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(value = JsonInclude.Include.NON_NULL)
public class ApiError {
    private long timestamp = new Date().getTime();
    private int status;
    private String message;
    private String url;
    private Map<String, String> validationErrors;
}
