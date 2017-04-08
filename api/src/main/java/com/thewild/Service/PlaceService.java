package com.thewild.Service;

import com.thewild.Model.Place;
import org.springframework.stereotype.Service;

import java.awt.*;

/**
 * The Service for Place.
 */
@Service
public class PlaceService {

    //region Public Methods

    /**
     * Returns place with specified ID.
     * @param ID - The ID.
     * @return
     */
    public Place Get(int ID) {

        return new Place(
                33,
                new Point(3,5),
                "Bebek",
                new String[]{"https://www.theistanbulinsider.com/wp-content/uploads/2011/09/bebek-istanbul.jpg"}
        );
    }

    //endregion

}
