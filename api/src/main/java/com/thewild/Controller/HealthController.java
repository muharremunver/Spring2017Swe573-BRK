package com.thewild.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * The controller provides sanity check of API.
 */
@RestController
@RequestMapping("/health")
public class HealthController {


    @RequestMapping(method = RequestMethod.GET)
    public boolean IsAlive() {

        return true;
    }

}
