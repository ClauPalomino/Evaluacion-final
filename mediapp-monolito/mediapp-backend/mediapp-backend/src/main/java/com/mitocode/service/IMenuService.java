package com.mitocode.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.mitocode.dto.MenuRolDTO;
import com.mitocode.model.Menu;

public interface IMenuService extends ICRUD<Menu>{
	
	List<Menu> listarMenuPorUsuario(String nombre);
	Page<Menu> listarPageable(Pageable pageable);
	
	public MenuRolDTO registrarMenuRol(MenuRolDTO menuRolDTO);
}
