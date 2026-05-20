package com.example.demo.dto;

/**
 * DTO usado para criar ou atualizar pessoas via API.
 * Contém apenas os dados que o cliente envia.
 *
 * Este objeto não é uma entidade JPA, é apenas um transporte de dados
 * entre o cliente e o backend.
 */
public class PersonRequest {

    // dados que o cliente envia no corpo da requisição JSON
    private String name;
    private String email;

    // construtor vazio necessário para o Spring converter JSON em objeto
    public PersonRequest() {
    }

    // construtor de conveniência usado internamente em testes ou exemplos
    public PersonRequest(String name, String email) {
        this.name = name;
        this.email = email;
    }

    // retorna o nome recebido na requisição
    public String getName() {
        return name;
    }

    // define o nome recebido no JSON para este DTO
    public void setName(String name) {
        this.name = name;
    }

    // retorna o email recebido na requisição
    public String getEmail() {
        return email;
    }

    // define o email recebido no JSON para este DTO
    public void setEmail(String email) {
        this.email = email;
    }
}
