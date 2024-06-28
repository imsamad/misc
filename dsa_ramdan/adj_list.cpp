#include <bits/stdc++.h>
using namespace std;


class G {
  public:
  int nodes, edges;
  map<int, list<int>> adj;
  // G(int nodes) {
    
  // }
  void addEdge(int v, int u, bool isDirected) {
    adj[v].push_back(u);

    if(!isDirected)
      adj[u].push_back(v);
  }


  void print() {
    for(auto v: adj) {
      cout << v.first << " -> ";

      for(int j:v.second)
        cout << j << ", ";
    
      cout << endl;
    }
  }


};
int x(int *vis) {

}

int main() {

}

int _main() {
  int n, m;

  // cin >> n;

  cin >> m;
  G g;

  for (int i = 0; i < m; i++) {
    int v, u;
    cin >> v >> u;
    g.addEdge(v, u, false);
  }


  g.print();

  return 0;
}


