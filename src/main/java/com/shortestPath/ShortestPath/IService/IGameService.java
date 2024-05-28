package com.shortestPath.ShortestPath.IService;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
@Component
public interface IGameService {
    public String[] shortestPath(ArrayList<ArrayList<Integer>> list, int src, int vertex);
}
