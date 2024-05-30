package com.shortestPath.ShortestPath.Controller;

import com.shortestPath.ShortestPath.IService.IGameService;
import com.shortestPath.ShortestPath.Model.SearchModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.Objects;

@Controller
public class GameController {
    @Autowired
    private IGameService gameService;

    @GetMapping("/home")
    public String Home(){
         return "home";
    }


    @PostMapping("/search-shortest-path")
    public ResponseEntity<ArrayList<Integer>> addAddress(
            @RequestBody SearchModel searchModel){
        ArrayList<ArrayList<Integer>> arrayListOfArrayLists = new ArrayList<>();
        for (ArrayList<Integer> arrayList : searchModel.getPaths()) {
            arrayListOfArrayLists.add(arrayList);
        }
        String[] shotestDistance=gameService.shortestPath(arrayListOfArrayLists,searchModel.getSrc(),searchModel.getVertex());
        String destinationPath=shotestDistance[searchModel.getDestination()];
        String[] allPath = destinationPath.split("\\|");
        ArrayList<Integer> edge=new ArrayList<>();
        for(int i=0;i<allPath.length-1;i++) {
            int end1 = Integer.parseInt(allPath[i]);
            int end2 = Integer.parseInt(allPath[i + 1]);

            for (ArrayList<Integer> arrayList : searchModel.getPaths()) {
                if((arrayList.get(0)==end1 && arrayList.get(1)==end2) || (arrayList.get(0)==end2 && arrayList.get(1)==end1)){
                    edge.add(arrayList.get(3));
                }
            }
        }
        return ResponseEntity.ok(edge);
    }
}
