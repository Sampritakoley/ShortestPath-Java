package com.shortestPath.ShortestPath.Model;

public class Pair implements Comparable<Pair>{
    private int v;
   private  String psf;

    public int getV() {
        return v;
    }

    public void setV(int v) {
        this.v = v;
    }

    public String getPsf() {
        return psf;
    }

    public void setPsf(String psf) {
        this.psf = psf;
    }

    public int getWsf() {
        return wsf;
    }

    public void setWsf(int wsf) {
        this.wsf = wsf;
    }

    private int wsf;
    public Pair(int v,String psf,int wsf){
        this.v=v;
        this.psf=psf;
        this.wsf=wsf;
    }
    public int compareTo(Pair o){
        return this.wsf-o.wsf;
    }
}
