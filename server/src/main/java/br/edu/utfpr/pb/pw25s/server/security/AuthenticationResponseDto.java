package br.edu.utfpr.pb.pw25s.server.security;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthenticationResponseDto {

    private String token;

}
