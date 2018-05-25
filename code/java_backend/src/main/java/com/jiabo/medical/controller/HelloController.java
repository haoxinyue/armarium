package com.jiabo.medical.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/view")
public class HelloController {
	
	@RequestMapping("/jsp")
	public String View() {
		return "test";
	}
	
	@RequestMapping("/log")
	public String log() {
		return "login";
	}

}
