package com.example.demo.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.PersonRequest;
import com.example.demo.dto.PersonResponse;
import com.example.demo.mapper.PersonMapper;
import com.example.demo.repository.PersonRepository;

/**
 * Serviço responsável pela lógica de negócio de pessoa.
 *
 * Ele orquestra o repositório e o mapper, deixando o controller apenas
 * responsável por expor a API HTTP.
 */
@Service
public class PersonService {

    private final PersonRepository repository;

    @Autowired
    public PersonService(PersonRepository repository) {
        this.repository = repository;
    }

    public List<PersonResponse> findAll() {
        return repository.findAll().stream()
                .map(PersonMapper::toResponse)
                .collect(Collectors.toList());
    }

    public PersonResponse create(PersonRequest request) {
        return PersonMapper.toResponse(repository.save(PersonMapper.toEntity(request)));
    }

    public Optional<PersonResponse> findById(Long id) {
        return repository.findById(id).map(PersonMapper::toResponse);
    }

    public Optional<PersonResponse> update(Long id, PersonRequest request) {
        return repository.findById(id).map(person -> {
            PersonMapper.updateEntity(request, person);
            return PersonMapper.toResponse(repository.save(person));
        });
    }

    public boolean delete(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}
