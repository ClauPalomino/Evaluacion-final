package com.mitocode.service.impl;

import java.io.File;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mitocode.dto.ConsultaListaExamenDTO;
import com.mitocode.dto.ConsultaResumenDTO;
import com.mitocode.dto.FiltroConsultaDTO;
import com.mitocode.model.Consulta;
import com.mitocode.repo.IConsultaExamenRepo;
import com.mitocode.repo.IConsultaRepo;
import com.mitocode.service.IConsultaService;

import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service
public class ConsultaServiceImpl implements IConsultaService {

	@Autowired
	private IConsultaRepo repo;

	@Autowired
	private IConsultaExamenRepo repoCE;

	@Transactional
	@Override
	public Consulta registrarTransaccional(ConsultaListaExamenDTO consultaDTO) {
		// aqui insertando consulta + detalle_consulta
		consultaDTO.getConsulta().getDetalleConsulta().forEach(det -> det.setConsulta(consultaDTO.getConsulta()));
		repo.save(consultaDTO.getConsulta());

		consultaDTO.getListExamen()
				.forEach(e -> repoCE.registrar(consultaDTO.getConsulta().getIdConsulta(), e.getIdExamen()));

		return consultaDTO.getConsulta();
	}

	@Override
	public Consulta registrar(Consulta cons) {
		/*
		 * for(DetalleConsulta det : cons.getDetalleConsulta()) { det.setConsulta(cons);
		 * }
		 */
		cons.getDetalleConsulta().forEach(det -> det.setConsulta(cons));
		return repo.save(cons);
	}

	@Override
	public Consulta modificar(Consulta t) {
		return repo.save(t);
	}

	@Override
	public Consulta leer(Integer id) {
		return repo.findOne(id);
	}

	@Override
	public List<Consulta> listar() {
		return repo.findAll();
	}

	@Override
	public void eliminar(Integer id) {
		repo.delete(id);
	}

	@Override
	public List<Consulta> buscar(FiltroConsultaDTO filtro) {
		return repo.buscar(filtro.getDni(), filtro.getNombreCompleto());
	}

	@Override
	public List<Consulta> buscarfecha(FiltroConsultaDTO filtro) {
		LocalDateTime fechaSgte = filtro.getFechaConsulta().plusDays(1);
		return repo.buscarFecha(filtro.getFechaConsulta(), fechaSgte);
	}

	@Override
	public List<ConsultaResumenDTO> listarResumen() {
		List<ConsultaResumenDTO> consulta = new ArrayList<>();
		// List<Object[]>
		// cantidad fecha
		// [4 , 11/05/2019]
		// [1 , 18/05/2019]
		repo.listarResumen().forEach(x -> {
			ConsultaResumenDTO cr = new ConsultaResumenDTO();
			cr.setCantidad(Integer.parseInt(String.valueOf(x[0])));
			cr.setFecha(String.valueOf(x[1]));
			consulta.add(cr);
		});
		return consulta;
	}

	@Override
	public byte[] generarReporte() {
		byte[] data = null;
		
		//HashMap<String, String> params = new HashMap<String, String>();
		//params.put("txt_empresa", "MitoCode Network");
		
		try {
			File file = new ClassPathResource("/reports/consultas.jasper").getFile();
			JasperPrint print = JasperFillManager.fillReport(file.getPath(), null, new JRBeanCollectionDataSource(this.listarResumen()));
			data = JasperExportManager.exportReportToPdf(print);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return data;
	}
}
