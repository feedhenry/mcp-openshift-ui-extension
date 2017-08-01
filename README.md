# mcp-openshift-ui-extension


## Local Installation

Start OpenShift

```
oc cluster up --service-catalog --host-config-dir=${PWD} --version='v3.6.0-rc.0'
```

Install the MCP Extension

```
./install.sh
```

The MCP Extension should now be visible in the OpenShift Web Console after the 'origin' container has restarted.
Visit https://127.0.0.1:8443 to see the Console.
