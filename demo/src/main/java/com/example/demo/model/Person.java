package com.example.demo.model; // pacote para classes de modelo do domínio

import jakarta.persistence.Entity; // define a classe como entidade JPA para persistência
import jakarta.persistence.Id; // marca o campo como chave primária
import jakarta.persistence.GeneratedValue; // habilita geração automática de id
import jakarta.persistence.GenerationType; // define a estratégia de geração do id

@Entity // indica que esta classe é uma entidade JPA
public class Person {

    @Id // campo que identifica unicamente cada registro
    @GeneratedValue(strategy = GenerationType.IDENTITY) // o banco gera o valor do id
    private Long id;

    // campos que serão salvos na tabela do banco
    private String name;
    private String email;

    // construtor vazio necessário para o JPA instanciar a entidade
    public Person() {
    }

    // construtor de conveniência para criar a entidade em código
    public Person(String name, String email) {
        this.name = name;
        this.email = email;
    }

    // getter para o id gerado pelo banco
    public Long getId() {
        return id;
    }

    // getter para o nome da pessoa
    public String getName() {
        return name;
    }

    // setter para o nome da pessoa
    public void setName(String name) {
        this.name = name;
    }

    // getter para o email da pessoa
    public String getEmail() {
        return email;
    }

    // setter para o email da pessoa
    public void setEmail(String email) {
        this.email = email;
    }
}
