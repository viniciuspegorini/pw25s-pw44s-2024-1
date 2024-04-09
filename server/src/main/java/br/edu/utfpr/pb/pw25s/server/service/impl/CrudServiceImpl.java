package br.edu.utfpr.pb.pw25s.server.service.impl;

import br.edu.utfpr.pb.pw25s.server.service.ICrudService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.List;

public abstract class CrudServiceImpl<T, ID extends Serializable>
        implements ICrudService<T, ID> {

    protected abstract JpaRepository<T, ID> getRepository();

    @Override
    public List<T> findAll() {
        return getRepository().findAll();
    }

    @Override
    public List<T> findAll(Sort sort) {
        return getRepository().findAll(sort);
    }

    @Override
    public Page<T> findAll(Pageable pageable) {
        return getRepository().findAll(pageable);
    }

    @Override
    public T save(T entity) {
        return getRepository().save(entity);
    }

    @Override
    public T saveAndFlush(T entity) {
        return getRepository().saveAndFlush(entity);
    }

    @Override
    public Iterable<T> save(Iterable<T> iterable) {
        return getRepository().saveAll(iterable);
    }

    @Override
    public void flush() {
        getRepository().flush();
    }

    @Override
    public T findOne(ID id) {
        return getRepository().findById(id).orElse(null);
    }

    @Override
    public boolean exists(ID id) {
        return getRepository().existsById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public long count() {
        return getRepository().count();
    }

    @Override
    public void delete(ID id) {
        getRepository().deleteById(id);
    }

    @Override
    public void delete(Iterable<? extends T> iterable) {
        getRepository().deleteAll(iterable);
    }

    @Override
    public void deleteAll() {
        getRepository().deleteAll();
    }
}