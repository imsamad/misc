#include <bits/stdc++.h>
using namespace std;

bool isCycle(int src, vector<vector<int>>& adjList, vector<bool>& visited) {
    unordered_map<int, int> parent;
    parent[src] = -1;

    queue<int> q;
    visited[src] = true;
    q.push(src);

    while (!q.empty()) {
        int v = q.front();
        q.pop();

        for (int u : adjList[v]) {
            if (visited[u] && u != parent[v]) {
                return true;  // Cycle detected
            } else if (!visited[u]) {
                q.push(u);
                visited[u] = true;
                parent[u] = v;
            }
        }
    }
    return false;
}

string cycleDetection(vector<vector<int>>& edges, int n, int m) {
    vector<vector<int>> adjList(n + 1);

    for (vector<int> edge : edges) {
        int v = edge[0], u = edge[1];
        adjList[v].push_back(u);
        adjList[u].push_back(v);
    }

    vector<bool> visited(n + 1, false);

    for (int i = 1; i <= n; i++) {
        if (!visited[i] && isCycle(i, adjList, visited)) {
            return "Yes";
        }
    }

    return "No";
}

int main() {
    int n = 5, m = 4;
    vector<vector<int>> edges = {
        {1, 2},
        {2, 3},
        {3, 4},
        {4, 5},
        // {5, 1}
    };

    string result = cycleDetection(edges, n, m);
    cout << "Cycle detected: " << result << endl;

    return 0;
}
