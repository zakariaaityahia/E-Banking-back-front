package org.sid.ebankingbackend.dtos;

import lombok.Data;


import jakarta.persistence.*;
import java.util.List;

@Data
public class CustomerDTO {
    private Long id;
    private String name;
    private String email;
}
