package com.mitocode.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.mitocode.exception.ModeloNotFoundException;
import com.mitocode.model.Especialidad;
import com.mitocode.model.Menu;
import com.mitocode.model.Rol;
import com.mitocode.service.IRolService;

@RestController
@RequestMapping("/roles")
public class RolController {
	@Autowired
	private IRolService service;
	
	@GetMapping
	public ResponseEntity<List<Rol>> listar() {
		List<Rol> roles = service.listar();
		return new ResponseEntity<List<Rol>>(roles, HttpStatus.OK);
	}
	
	@GetMapping("/pageable")
	public ResponseEntity<Page<Rol>> listarPageable(Pageable pageable) {
		Page<Rol> roles = service.listarPageable(pageable);
		return new ResponseEntity<Page<Rol>>(roles, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Rol> listarPorId(@PathVariable("id") Integer idRol) {
		Rol rol = service.leer(idRol);
		if(rol == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO: " + idRol);
		}
		return new ResponseEntity<Rol>(rol, HttpStatus.OK);
		
	}
	
	@PostMapping
	public ResponseEntity<Object> registrar(@Valid @RequestBody Rol rol) {
		Rol ro = service.registrar(rol);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(ro.getIdRol()).toUri();
		return ResponseEntity.created(location).build();
	}
	@PutMapping
	public ResponseEntity<Object> modificar(@Valid @RequestBody Rol rol) {
		service.modificar(rol);
		return new ResponseEntity<Object>(HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> eliminar(@PathVariable("id") Integer idRol) {
		Rol rol = service.leer(idRol);
		if (rol == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO: " + idRol);
		} else {
			service.eliminar(idRol);
		}
		return new ResponseEntity<Object>(HttpStatus.OK);
	}

	@PostMapping(value = "/menu", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Rol>> listar(@RequestBody Integer idMenu) {
		List<Rol> roles = new ArrayList<>();
		roles = service.listarRolPorMenu(idMenu);
		return new ResponseEntity<List<Rol>>(roles, HttpStatus.OK);
	}
	@PostMapping(value = "/usuario", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Rol>> listarUsuario(@RequestBody Integer idUsuario) {
		List<Rol> roles = new ArrayList<>();
		roles = service.listarRolPorUsuario(idUsuario);
		return new ResponseEntity<List<Rol>>(roles, HttpStatus.OK);
	}
}
