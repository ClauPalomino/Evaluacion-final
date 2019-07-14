package com.mitocode.dto;

import com.mitocode.model.Rol;

import java.util.List;

public class MenuRolDTO {

	private Integer idMenu;
	private List<Rol> roles;
	public Integer getIdMenu() {
		return idMenu;
	}
	public void setIdMenu(Integer idMenu) {
		this.idMenu = idMenu;
	}
	public List<Rol> getRoles() {
		return roles;
	}
	public void setRoles(List<Rol> roles) {
		this.roles = roles;
	}
	
	
	
}
