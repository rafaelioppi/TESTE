package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Person;

/**
 * Repositório JPA para Person.
 *
 * Esta interface herda métodos prontos do Spring Data JPA,
 * como save, findAll, findById e deleteById.
 */
public interface PersonRepository extends JpaRepository<Person, Long> {
    // não é preciso implementar nenhum método manualmente aqui
    // o Spring Data cria a implementação automaticamente
}
