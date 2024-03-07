package br.edu.utfpr.pb.pw25s.server.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {

    private String username;
    private String displayName;
    private String password;
}
