package com.example.demo.controller; // pacote onde esta classe pertence

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired; // injeção de dependência
import org.springframework.http.ResponseEntity; // representa resposta HTTP completa
import org.springframework.web.bind.annotation.*; // anotações REST do Spring

import com.example.demo.dto.PersonRequest; // DTO recebido nas requisições de criação/atualização
import com.example.demo.dto.PersonResponse; // DTO enviado nas respostas da API
import com.example.demo.service.PersonService; // serviço que orquestra repositório e mapper

/**
 * Controlador REST para manipular pessoas.
 *
 * Ele expõe endpoints HTTP para criar, listar, obter, atualizar e excluir pessoas.
 * A API usa DTOs para separar a entidade interna do formato de entrada/saída.
 */
@RestController
@RequestMapping("/persons")
public class PersonController {

    private final PersonService service;

    @Autowired
    public PersonController(PersonService service) {
        this.service = service;
    }

    @GetMapping
    public List<PersonResponse> all() {
        return service.findAll();
    }

    @PostMapping
    public PersonResponse create(@RequestBody PersonRequest personRequest) {
        return service.create(personRequest);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PersonResponse> getOne(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PersonResponse> update(@PathVariable Long id, @RequestBody PersonRequest updated) {
        return service.update(id, updated)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return service.delete(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
