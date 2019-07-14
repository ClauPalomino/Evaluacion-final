package com.mitocode.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.mitocode.model.Menu;
import com.mitocode.model.Rol;
import com.mitocode.repo.IRolRepo;
import com.mitocode.service.IRolService;
@Service
public class RolServiceImpl implements IRolService{
    @Autowired
    private IRolRepo repo;
	@Override
	public Rol registrar(Rol rol) {
		// TODO Auto-generated method stub
		return repo.save(rol);
	}

	@Override
	public Rol modificar(Rol rol) {
		// TODO Auto-generated method stub
		return repo.save(rol);
	}

	@Override
	public Rol leer(Integer idRol) {
		// TODO Auto-generated method stub
		return repo.findOne(idRol);
	}

	@Override
	public List<Rol> listar() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}

	@Override
	public void eliminar(Integer idRol) {
		// TODO Auto-generated method stub
		repo.delete(idRol);
		
	}

	@Override
	public Page<Rol> listarPageable(Pageable pageable) {
		// TODO Auto-generated method stub
		return repo.findAll(pageable);
	}
	
	@Override
	public List<Rol> listarRolPorMenu(Integer idMenu) {		
		List<Rol> roles = new ArrayList<>();
		repo.listarRolPorMenu(idMenu).forEach( x -> {
			Rol r = new Rol();
			r.setIdRol((Integer.parseInt(String.valueOf(x[0]))));
			r.setNombre(String.valueOf(x[1]));
			r.setDescripcion(String.valueOf(x[2]));
				
			roles.add(r);
		});
		return roles;			
	}

	@Override
	public List<Rol> listarRolPorUsuario(Integer idUsuario) {		
		List<Rol> roles = new ArrayList<>();
		repo.listarRolPorUsuario(idUsuario).forEach( x -> {
			Rol r = new Rol();
			r.setIdRol((Integer.parseInt(String.valueOf(x[0]))));
			r.setNombre(String.valueOf(x[1]));
			r.setDescripcion(String.valueOf(x[2]));
				
			roles.add(r);
		});
		return roles;			
	}
}
