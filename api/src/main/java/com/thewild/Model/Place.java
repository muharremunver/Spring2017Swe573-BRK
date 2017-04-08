package com.thewild.Model;

import java.awt.*;

/**
 * Data model for Place.
 */
public class Place {

    //region Private Members

    // Identifier.
    private int ID;

    // Location.
    private Point Location;

    // Name.
    private String Name;

    // List of pictures.
    private String[] Pictures;

    //endregion

    //region Constructors

    /**
     * Default ctor.
     */
    public Place(){

    }

    /**
     * Ctor.
     * @param ID
     * @param location
     * @param name
     * @param pictures
     */
    public Place(int ID, Point location, String name, String[] pictures) {

        this.ID = ID;
        Location = location;
        Name = name;
        Pictures = pictures;
    }

    //endregion

    //region Getters and Setters

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public Point getLocation() {
        return Location;
    }

    public void setLocation(Point location) {
        Location = location;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String[] getPictures() {
        return Pictures;
    }

    public void setPictures(String[] pictures) {
        Pictures = pictures;
    }


    //endregion
}
