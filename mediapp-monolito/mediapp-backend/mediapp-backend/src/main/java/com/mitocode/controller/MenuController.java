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

import com.mitocode.dto.MenuRolDTO;
import com.mitocode.exception.ModeloNotFoundException;
import com.mitocode.model.Menu;
import com.mitocode.service.IMenuService;

@RestController
@RequestMapping("/menus")
public class MenuController {
	
	@Autowired
	private IMenuService service;

	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Menu>> listar() {
		List<Menu> menus = new ArrayList<>();
		menus = service.listar();
		return new ResponseEntity<List<Menu>>(menus, HttpStatus.OK);
	}
	
	@PostMapping(value = "/usuario", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Menu>> listar(@RequestBody String nombre) {
		List<Menu> menus = new ArrayList<>();
		menus = service.listarMenuPorUsuario(nombre);
		return new ResponseEntity<List<Menu>>(menus, HttpStatus.OK);
	}
	
	@GetMapping("/pageable")
	public ResponseEntity<Page<Menu>> listarPageable(Pageable pageable) {
		Page<Menu> menus = service.listarPageable(pageable);
		return new ResponseEntity<Page<Menu>>(menus, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Menu> listarPorId(@PathVariable("id") Integer idMenu) {
		Menu menu = service.leer(idMenu);
		if(menu == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO: " + idMenu);
		}
		
		return new ResponseEntity<Menu>(menu, HttpStatus.OK);
		
	}
	
	@PostMapping
	public ResponseEntity<Object> registrar(@Valid @RequestBody Menu menu) {
		Menu men = service.registrar(menu);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(men.getIdMenu()).toUri();
		return ResponseEntity.created(location).build();
	}
	
	
	@PutMapping
	public ResponseEntity<Object> modificar(@Valid @RequestBody Menu menu) {
		service.modificar(menu);
		return new ResponseEntity<Object>(HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> eliminar(@PathVariable("id") Integer idMenu) {
		Menu menu = service.leer(idMenu);
		if (menu == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO: " + idMenu);
		} else {
			service.eliminar(idMenu);
		}
		return new ResponseEntity<Object>(HttpStatus.OK);
	}
	
	
	@PostMapping(produces = "application/json", consumes = "application/json")
	public ResponseEntity<Object> registrarMenuRol(@Valid @RequestBody MenuRolDTO menuRolDTO) {
		service.registrarMenuRol(menuRolDTO);
		return new ResponseEntity<Object>(HttpStatus.OK);
	}
}
