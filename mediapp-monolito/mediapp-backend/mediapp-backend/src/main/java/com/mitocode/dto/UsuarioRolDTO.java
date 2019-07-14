package com.mitocode.dto;

import com.mitocode.model.Rol;

import java.util.List;

public class UsuarioRolDTO {

	private Integer idUsuario;
	private List<Rol> roles;
	public Integer getIdUsuario() {
		return idUsuario;
	}
	public void setIdUsuario(Integer idUsuario) {
		this.idUsuario = idUsuario;
	}
	public List<Rol> getRoles() {
		return roles;
	}
	public void setRoles(List<Rol> roles) {
		this.roles = roles;
	}
	
	
	
}
