package com.mitocode.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.mitocode.dto.UsuarioRolDTO;
import com.mitocode.model.Usuario;
import com.mitocode.repo.IUsuarioRepo;
import com.mitocode.service.IUsuarioService;

@Service
public class UsuarioServiceImpl implements IUsuarioService{

	@Autowired
	private IUsuarioRepo repo;
	
	@Override
	public Usuario registrar(Usuario t) {
		return repo.save(t);
	}

	@Override
	public Usuario modificar(Usuario t) {		
		return repo.save(t);
	}

	@Override
	public Usuario leer(Integer id) {		
		return repo.findOne(id);
	}

	@Override
	public List<Usuario> listar() {
		return repo.findAll();
	}

	@Override
	public void eliminar(Integer id) {
		repo.delete(id);
	}

	@Override
	public Page<Usuario> listarPageable(Pageable pageable) {
		// TODO Auto-generated method stub
		return repo.findAll(pageable);
	}
	
		
	@Override
	public UsuarioRolDTO registrarUsuarioRol(UsuarioRolDTO usuarioRolDTO) {
		repo.eliminarUsuarioRol(usuarioRolDTO.getIdUsuario());
		usuarioRolDTO.getRoles().forEach(det -> repo.registrarUsuarioRol(usuarioRolDTO.getIdUsuario(), det.getIdRol()));
		
		return usuarioRolDTO;
	}
}
