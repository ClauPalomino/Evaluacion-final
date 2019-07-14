package com.mitocode.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.mitocode.model.Usuario;

public interface IUsuarioRepo extends JpaRepository<Usuario, Integer>{

	@Transactional
	@Modifying
	@Query(value = "INSERT INTO usuario_rol(id_usuario, id_rol) VALUES (:idUsuario, :idRol)", nativeQuery = true)
	Integer registrarUsuarioRol(@Param("idUsuario")Integer idUsuario,@Param("idRol") Integer idRol);

	@Transactional
	@Modifying 
	@Query(value = "DELETE FROM usuario_rol WHERE id_usuario = :idUsuario", nativeQuery = true)
	Integer eliminarUsuarioRol(@Param("idUsuario")Integer idUsuario);
	
	Usuario findOneByUsername(String username);
}
