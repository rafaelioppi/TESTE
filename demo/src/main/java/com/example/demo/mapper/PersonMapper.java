package com.example.demo.mapper;

import com.example.demo.dto.PersonRequest;
import com.example.demo.dto.PersonResponse;
import com.example.demo.model.Person;

/**
 * Classe de conversão entre a entidade Person e os DTOs da API.
 *
 * Esta classe é responsável apenas por transformar dados entre camadas.
 * Não contém lógica de negócio ou acesso ao banco.
 */
public class PersonMapper {

    /**
     * Converte os dados recebidos da API (DTO) em entidade de persistência.
     *
     * O controller recebe um PersonRequest e quer salvar uma Person no banco.
     */
    public static Person toEntity(PersonRequest request) {
        return new Person(request.getName(), request.getEmail());
    }

    /**
     * Converte a entidade do banco em DTO usado para enviar resposta ao cliente.
     *
     * O cliente não precisa saber da entidade completa, apenas dos campos expostos.
     */
    public static PersonResponse toResponse(Person person) {
        return new PersonResponse(person.getId(), person.getName(), person.getEmail());
    }

    /**
     * Atualiza uma entidade existente com os dados vindos do DTO.
     *
     * Usado quando o cliente faz PUT /persons/{id} para alterar a pessoa.
     */
    public static void updateEntity(PersonRequest request, Person person) {
        person.setName(request.getName());
        person.setEmail(request.getEmail());
    }
}
