package com.app.wild.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

    @RequestMapping({ "/login","/map" })
    public String index() {
        return "forward:/index.html";
    }
}