package com.shortestPath.ShortestPath.Model;

import java.util.ArrayList;

public class SearchModel {

    private ArrayList<Integer>[] paths;
    private int src;


    public ArrayList<Integer>[] getPaths() {
        return paths;
    }

    public void setPaths(ArrayList<Integer>[] paths) {
        this.paths = paths;
    }

    public int getSrc() {
        return src;
    }

    public void setSrc(int src) {
        this.src = src;
    }

    public int getVertex() {
        return vertex;
    }

    public void setVertex(int vertex) {
        this.vertex = vertex;
    }

    public int getDestination() {
        return destination;
    }

    public void setDestination(int destination) {
        this.destination = destination;
    }

    private int vertex;

    private int destination;
}
