package com.shortestPath.ShortestPath.Model;

public class Edge {
    public int getU() {
        return u;
    }

    public void setU(int u) {
        this.u = u;
    }

    public int getV() {
        return v;
    }

    public void setV(int v) {
        this.v = v;
    }

    public int getW() {
        return w;
    }

    public void setW(int w) {
        this.w = w;
    }

    private int u;
    private  int v;
    private int w;
    public Edge(int u,int v,int w){
        this.u=u;
        this.v=v;
        this.w=w;
    }
}
