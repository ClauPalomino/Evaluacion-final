package com.mitocode.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



import com.mitocode.dto.UsuarioRolDTO;
import com.mitocode.exception.ModeloNotFoundException;
import com.mitocode.model.Usuario;
import com.mitocode.service.IUsuarioService;


@RestController
@RequestMapping("/usuarioss")
public class UsuarioController {
	@Autowired
	private IUsuarioService service;
	
	
	@GetMapping("/pageable")
	public ResponseEntity<Page<Usuario>> listarPageable(Pageable pageable) {
		Page<Usuario> usuarios = service.listarPageable(pageable);
		return new ResponseEntity<Page<Usuario>>(usuarios, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Usuario> listarPorId(@PathVariable("id") Integer idUsuario) {
		Usuario usuario = service.leer(idUsuario);
		if(usuario == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO: " + idUsuario);
		}
		return new ResponseEntity<Usuario>(usuario, HttpStatus.OK);
		
	}
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Usuario>> listar() {
		List<Usuario> usuarios = new ArrayList<>();
		usuarios = service.listar();
		return new ResponseEntity<List<Usuario>>(usuarios, HttpStatus.OK);
	}
	
	@PostMapping(produces = "application/json", consumes = "application/json")
	public ResponseEntity<Object> registrarUsuarioRol(@Valid @RequestBody UsuarioRolDTO usuarioRolDTO) {
		service.registrarUsuarioRol(usuarioRolDTO);
		return new ResponseEntity<Object>(HttpStatus.OK);
	}

}
