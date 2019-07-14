package com.mitocode.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.mitocode.model.Rol;

public interface IRolService extends ICRUD<Rol>{
	Page<Rol> listarPageable(Pageable pageable);
	List<Rol> listarRolPorMenu(Integer idMenu);
	List<Rol> listarRolPorUsuario(Integer idUsuario);
}
