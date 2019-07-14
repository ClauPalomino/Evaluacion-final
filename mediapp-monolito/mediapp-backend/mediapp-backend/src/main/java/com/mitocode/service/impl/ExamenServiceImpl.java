package com.mitocode.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mitocode.model.Examen;
import com.mitocode.repo.IExamenRepo;
import com.mitocode.service.IExamenService;

@Service
public class ExamenServiceImpl implements IExamenService{

	@Autowired
	private IExamenRepo repo;
	
	@Override
	public Examen registrar(Examen t) {
		return repo.save(t);
	}

	@Override
	public Examen modificar(Examen t) {		
		return repo.save(t);
	}

	@Override
	public Examen leer(Integer id) {		
		return repo.findOne(id);
	}

	@Override
	public List<Examen> listar() {
		return repo.findAll();
	}

	@Override
	public void eliminar(Integer id) {
		repo.delete(id);
	}

}
