package com.mitocode.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mitocode.model.Rol;

public interface IRolRepo extends JpaRepository<Rol, Integer>{

	@Query(value="select  distinct r.* from menu_rol mr inner join rol r on r.id_rol = mr.id_rol inner join menu m on m.id_menu= mr.id_menu where m.id_menu = :id_menu", nativeQuery = true)
	List<Object[]> listarRolPorMenu(@Param("id_menu") Integer idMenu);
	@Query(value="select  distinct r.* from usuario_rol ur inner join rol r on r.id_rol = ur.id_rol inner join usuario u on u.id_usuario= ur.id_usuario where u.id_usuario = :id_usuario", nativeQuery = true)
	List<Object[]> listarRolPorUsuario(@Param("id_usuario") Integer idUsuario);
}
