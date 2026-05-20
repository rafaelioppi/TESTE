package com.example.demo.dto;

/**
 * DTO retornado pela API quando uma pessoa é consultada.
 * Contém apenas os dados que o cliente deve ver.
 */
public class PersonResponse {

    // id gerado pelo banco de dados após salvar a pessoa
    private Long id;
    // nome da pessoa retornado para o cliente
    private String name;
    // email da pessoa retornado para o cliente
    private String email;

    // construtor vazio necessário para que o Spring possa desserializar JSON
    public PersonResponse() {
    }

    // construtor usado internamente para criar o DTO a partir da entidade
    public PersonResponse(Long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    // retorna o id atribuído pelo banco
    public Long getId() {
        return id;
    }

    // define o id no DTO de resposta
    public void setId(Long id) {
        this.id = id;
    }

    // retorna o nome a ser exibido ao cliente
    public String getName() {
        return name;
    }

    // define o nome a ser exibido ao cliente
    public void setName(String name) {
        this.name = name;
    }

    // retorna o email a ser exibido ao cliente
    public String getEmail() {
        return email;
    }

    // define o email a ser exibido ao cliente
    public void setEmail(String email) {
        this.email = email;
    }
}
