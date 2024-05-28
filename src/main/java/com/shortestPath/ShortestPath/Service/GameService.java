package com.shortestPath.ShortestPath.Service;

import com.shortestPath.ShortestPath.IService.IGameService;
import com.shortestPath.ShortestPath.Model.Edge;
import com.shortestPath.ShortestPath.Model.Pair;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.PriorityQueue;
@Service
public class GameService implements IGameService {

    public String[] shortestPath(ArrayList<ArrayList<Integer>> list, int src, int vertex) {

        ArrayList<Edge>[] graph=new ArrayList[vertex];
        for(int i=0;i<vertex;i++){
            graph[i]=new ArrayList<>();
        }

        for(int i=0;i<list.size();i++){
            ArrayList<Integer> edlist=list.get(i);
            graph[edlist.get(0)].add(new Edge(edlist.get(0), edlist.get(1), edlist.get(2)));
            graph[edlist.get(1)].add(new Edge(edlist.get(1), edlist.get(0), edlist.get(2)));
        }

        int count = graph.length;
        boolean[] visitedVertex = new boolean[count];
        String[] distance = new String[count];
        for (int i = 0; i < count; i++) {
            visitedVertex[i] = false;
        }

        PriorityQueue<Pair> pq=new PriorityQueue<>();

        pq.add(new Pair(src, src+"", 0));

        while(pq.size()>0){
            Pair rm=pq.remove();
            if(visitedVertex[rm.getV()]){
                continue;
            }
            visitedVertex[rm.getV()]=true;
            distance[rm.getV()]=rm.getPsf();
            System.out.println(rm.getV()+" via "+rm.getPsf()+" @ "+rm.getWsf());
            for(Edge e:graph[rm.getV()]){
                pq.add(new Pair(e.getV(), rm.getPsf()+"|"+e.getV(),rm.getWsf()+e.getW()));
            }
        }
        return distance;
    }

}
