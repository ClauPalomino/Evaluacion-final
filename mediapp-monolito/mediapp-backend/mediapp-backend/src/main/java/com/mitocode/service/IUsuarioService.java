package com.mitocode.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import com.mitocode.dto.UsuarioRolDTO;
import com.mitocode.model.Usuario;

public interface IUsuarioService extends ICRUD<Usuario>{
	Page<Usuario> listarPageable(Pageable pageable);
	public UsuarioRolDTO registrarUsuarioRol(UsuarioRolDTO usuarioRolDTO);
}
