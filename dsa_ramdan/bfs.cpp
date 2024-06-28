#include <bits/stdc++.h>
using namespace std;
int _N = 8;

int G[8][8]={
  {0,0,0,0,0,0,0,0},
  {0,0,1,1,1,0,0,0},
  {0,1,0,1,0,0,0,0},
  {0,1,1,0,1,0,0,0},
  {0,1,0,1,0,1,0,0},
  {0,0,0,1,1,0,1,1},
  {0,0,0,0,0,1,0,0},
  {0,0,0,0,0,1,0,0}
};

// void bfs_r(int v, int *visited) {
//   if(visited[v]) return;
//   cout << v << " ";
//   visited[v] = 1;


//   for(int u = 1; u < _N; u++) {
//     if(G[v][u] && !visited[u]) {
//       bfs_r(u, visited);
//     }
//   }
// }
void bfs_r(queue<int> &q, int *visited) {
    if(q.empty()) return;
    
    int v = q.front();
    q.pop();

    for(int u = 1; u < _N; u++) {
      if(G[v][u] && !visited[u]) {
        visited[u] = 1;
        q.push(u);
        cout << u << " ";
      }
    }
    bfs_r(q, visited);
}

void bfs(int startVertex) {
  cout << startVertex << " ";

  int *visited = new int[_N];

  queue<int> q;

  q.push(startVertex);
  visited[startVertex] = 1;
  bfs_r(q, visited);

  cout << endl;  
}

void bfs_it(int i) {
  cout << i << " ";

  queue<int> q;

  q.push(i);

  int *visited = new int[_N];
  visited[i] = 1;

  while(!q.empty()) {
    int v = q.front();
    q.pop();

    for(int u = 1; u < _N; u++) {
      if(visited[u] == 0 && G[v][u]){
        visited[u] = 1;
        q.push(u);
        cout << u << " ";
      }
    }
  }

  cout << endl;
}


void dfs(int v, int *visited) {
  if(visited[v]) return;

  visited[v] = 1;
  cout << v << " ";
  for(int u = 1; u < _N; u++)
    if(G[v][u]) dfs(u, visited);  
}

void clean(int *v, int x = 1) {
  for(int i = 0; i < _N; i++) v[i] = 0;

  if(x) cout << endl;
}

void dfs_it(int i) {
  stack<int> st;

  st.push(i);

  int *visited = new int[_N];
  clean(visited, 0);

  while(!st.empty()) {
    int v = st.top();
    st.pop();

    if(visited[v] == 0) {
      cout << v << " ";
      visited[v] = 1;
    }

    // for(int u = _N - 1; u > 0; u--) {
    for(int u = 1; u < _N; u++) {
      if(visited[u] == 0 && G[v][u]) {
        st.push(u);
      }
    }


  }
    cout << endl;
}

int main() {
  int *v = new int[_N];

  for(int i = 1; i < _N; i++) {
  dfs(i, v);
  clean(v);
  dfs_it(i);
  }

cout << "=============" << endl;
  for(int i = 1; i < _N; i++)
    {
      bfs(i);
      bfs_it(i);
    }
  return 0;
}