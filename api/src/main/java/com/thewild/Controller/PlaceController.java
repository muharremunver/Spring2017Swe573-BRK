package com.thewild.Controller;

import com.thewild.Model.Place;
import com.thewild.Service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * The controller provides Place related data.
 */
@RestController
@RequestMapping("/places")
public class PlaceController {

    //region Private Members

    @Autowired
    private PlaceService _placeService;

    //endregion

    //region Public Methods

    /**
     * Returns place with specified ID.
     * @param ID - The ID
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Place GetPlaceByID(@PathVariable("id") int ID) {

        return this._placeService.Get(ID);
    }

    //endregion

}
