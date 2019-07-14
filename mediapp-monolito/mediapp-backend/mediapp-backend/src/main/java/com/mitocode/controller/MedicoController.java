package com.mitocode.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mitocode.model.Medico;
import com.mitocode.service.IMedicoService;

@RestController
@RequestMapping("/medicos")
public class MedicoController {

	@Autowired
	private IMedicoService service;
		
	//@PreAuthorize("@restAuthService.hasAccess('listar')")
	@GetMapping
	public List<Medico> listar() {
		return service.listar();
	}
	
	//@PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
	@GetMapping("/{id}")
	public Medico listarPorId(@PathVariable("id") Integer idMedico) {
		return service.leer(idMedico);
	}
	
	@PostMapping
	public Medico registrar(@RequestBody Medico med) {
		return service.registrar(med);
	}
	
	@PutMapping
	public Medico modificar(@RequestBody Medico med) {
		return service.modificar(med);
	}
	
	@DeleteMapping("/{id}")
	public void eliminar(@PathVariable("id") Integer idMedico) {
		service.eliminar(idMedico);
	}
}
