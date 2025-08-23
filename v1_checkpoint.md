# Checkpoint v1

**Commit:** `aca225fec734918c224028e2b6845916bd483cf8`
**Author:** hawkins75 <daesung75@gmail.com>
**Date:** Sat Aug 23 17:27:45 2025 +0900

## Commit Message

feat: Initial commit of the sales-app project

## Changes

```diff
diff --git a/package-lock.json b/package-lock.json
index 93d927c..ac68810 100644
--- a/package-lock.json
+++ b/package-lock.json
@@ -12,8 +12,13 @@
         "@testing-library/jest-dom": "^6.8.0",
         "@testing-library/react": "^16.3.0",
         "@testing-library/user-event": "^13.5.0",
+        "bootstrap": "^5.3.7",
         "react": "^19.1.1",
+        "react-bootstrap": "^2.10.10",
+        "react-bootstrap-icons": "^1.11.6",
         "react-dom": "^19.1.1",
+        "react-router-bootstrap": "^0.26.3",
+        "react-router-dom": "^7.8.2",
         "react-scripts": "5.0.1",
         "web-vitals": "^2.1.4"
       }
@@ -3075,6 +3080,85 @@
         }
       }
     },
+    "node_modules/@popperjs/core": {
+      "version": "2.11.8",
+      "resolved": "https://registry.npmjs.org/@popperjs/core/-/core-2.11.8.tgz",
+      "integrity": "sha512-P1st0aksCrn9sGZhp8GMYwBnQsbvAWsZAX44oXNNvLHGqAOcoVxmjZiohstwQ7SqKnbR47akdNi+uleWD8+g6A==",
+      "license": "MIT",
+      "funding": {
+        "type": "opencollective",
+        "url": "https://opencollective.com/popperjs"
+      }
+    },
+    "node_modules/@react-aria/ssr": {
+      "version": "3.9.10",
+      "resolved": "https://registry.npmjs.org/@react-aria/ssr/-/ssr-3.9.10.tgz",
+      "integrity": "sha512-hvTm77Pf+pMBhuBm760Li0BVIO38jv1IBws1xFm1NoL26PU+fe+FMW5+VZWyANR6nYL65joaJKZqOdTQMkO9IQ==",
+      "license": "Apache-2.0",
+      "dependencies": {
+        "@swc/helpers": "^0.5.0"
+      },
+      "engines": {
+        "node": ">= 12"
+      },
+      "peerDependencies": {
+        "react": "^16.8.0 || ^17.0.0-rc.1 || ^18.0.0 || ^19.0.0-rc.1"
+      }
+    },
+    "node_modules/@restart/hooks": {
+      "version": "0.4.16",
+      "resolved": "https://registry.npmjs.org/@restart/hooks/-/hooks-0.4.16.tgz",
+      "integrity": "sha512-f7aCv7c+nU/3mF7NWLtVVr0Ra80RqsO89hO72r+Y/nvQr5+q0UFGkocElTH6MJApvReVh6JHUFYn2cw1WdHF3w==",
+      "license": "MIT",
+      "dependencies": {
+        "dequal": "^2.0.3"
+      },
+      "peerDependencies": {
+        "react": ">=16.8.0"
+      }
+    },
+    "node_modules/@restart/ui": {
+      "version": "1.9.4",
+      "resolved": "https://registry.npmjs.org/@restart/ui/-/ui-1.9.4.tgz",
+      "integrity": "sha512-N4C7haUc3vn4LTwVUPlkJN8Ach/+yIMvRuTVIhjilNHqegY60SGLrzud6errOMNJwSnmYFnt1J0H/k8FE3A4KA==",
+      "license": "MIT",
+      "dependencies": {
+        "@babel/runtime": "^7.26.0",
+        "@popperjs/core": "^2.11.8",
+        "@react-aria/ssr": "^3.5.0",
+        "@restart/hooks": "^0.5.0",
+        "@types/warning": "^3.0.3",
+        "dequal": "^2.0.3",
+        "dom-helpers": "^5.2.0",
+        "uncontrollable": "^8.0.4",
+        "warning": "^4.0.3"
+      },
+      "peerDependencies": {
+        "react": ">=16.14.0",
+        "react-dom": ">=16.14.0"
+      }
+    },
+    "node_modules/@restart/ui/node_modules/@restart/hooks": {
+      "version": "0.5.1",
+      "resolved": "https://registry.npmjs.org/@restart/hooks/-/hooks-0.5.1.tgz",
+      "integrity": "sha512-EMoH04NHS1pbn07iLTjIjgttuqb7qu4+/EyhAx27MHpoENcB2ZdSsLTNxmKD+WEPnZigo62Qc8zjGnNxoSE/5Q==",
+      "license": "MIT",
+      "dependencies": {
+        "dequal": "^2.0.3"
+      },
+      "peerDependencies": {
+        "react": ">=16.8.0"
+      }
+    },
+    "node_modules/@restart/ui/node_modules/uncontrollable": {
+      "version": "8.0.4",
+      "resolved": "https://registry.npmjs.org/uncontrollable/-/uncontrollable-8.0.4.tgz",
+      "integrity": "sha512-ulRWYWHvscPFc0QQXvyJjY6LIXU56f0h8pQFvhxiKk5V1fcI8gp9Ht9leVAhrVjzqMw0BgjspBINx9r6oyJUvQ==",
+      "license": "MIT",
+      "peerDependencies": {
+        "react": ">=16.14.0"
+      }
+    },
     "node_modules/@rollup/plugin-babel": {
       "version": "5.3.1",
       "resolved": "https://registry.npmjs.org/@rollup/plugin-babel/-/plugin-babel-5.3.1.tgz",
@@ -3423,6 +3507,15 @@
         "url": "https://github.com/sponsors/gregberge"
       }
     },
+    "node_modules/@swc/helpers": {
+      "version": "0.5.17",
+      "resolved": "https://registry.npmjs.org/@swc/helpers/-/helpers-0.5.17.tgz",
+      "integrity": "sha512-5IKx/Y13RsYd+sauPb2x+U/xZikHjolzfuDgTAl/Tdf3Q8rslRvC19NKDLgAJQ6wsqADk10ntlv08nPFw/gO/A==",
+      "license": "Apache-2.0",
+      "dependencies": {
+        "tslib": "^2.8.0"
+      }
+    },
     "node_modules/@testing-library/dom": {
       "version": "10.4.1",
       "resolved": "https://registry.npmjs.org/@testing-library/dom/-/dom-10.4.1.tgz",
@@ -3786,6 +3879,12 @@
       "integrity": "sha512-+68kP9yzs4LMp7VNh8gdzMSPZFL44MLGqiHWvttYJe+6qnuVr4Ek9wSBQoveqY/r+LwjCcU29kNVkidwim+kYA==",
       "license": "MIT"
     },
+    "node_modules/@types/prop-types": {
+      "version": "15.7.15",
+      "resolved": "https://registry.npmjs.org/@types/prop-types/-/prop-types-15.7.15.tgz",
+      "integrity": "sha512-F6bEyamV9jKGAFBEmlQnesRPGOQqS2+Uwi0Em15xenOxHaf2hv6L8YCVn3rPdPJOiJfPiCnLIRyvwVaqMY3MIw==",
+      "license": "MIT"
+    },
     "node_modules/@types/q": {
       "version": "1.5.8",
       "resolved": "https://registry.npmjs.org/@types/q/-/q-1.5.8.tgz",
@@ -3804,6 +3903,24 @@
       "integrity": "sha512-hKormJbkJqzQGhziax5PItDUTMAM9uE2XXQmM37dyd4hVM+5aVl7oVxMVUiVQn2oCQFN/LKCZdvSM0pFRqbSmQ==",
       "license": "MIT"
     },
+    "node_modules/@types/react": {
+      "version": "19.1.11",
+      "resolved": "https://registry.npmjs.org/@types/react/-/react-19.1.11.tgz",
+      "integrity": "sha512-lr3jdBw/BGj49Eps7EvqlUaoeA0xpj3pc0RoJkHpYaCHkVK7i28dKyImLQb3JVlqs3aYSXf7qYuWOW/fgZnTXQ==",
+      "license": "MIT",
+      "dependencies": {
+        "csstype": "^3.0.2"
+      }
+    },
+    "node_modules/@types/react-transition-group": {
+      "version": "4.4.12",
+      "resolved": "https://registry.npmjs.org/@types/react-transition-group/-/react-transition-group-4.4.12.tgz",
+      "integrity": "sha512-8TV6R3h2j7a91c+1DXdJi3Syo69zzIZbz7Lg5tORM5LEJG7X/E6a1V3drRyBRZq7/utz7A+c4OgYLiLcYGHG6w==",
+      "license": "MIT",
+      "peerDependencies": {
+        "@types/react": "*"
+      }
+    },
     "node_modules/@types/resolve": {
       "version": "1.17.1",
       "resolved": "https://registry.npmjs.org/@types/resolve/-/resolve-1.17.1.tgz",
@@ -3876,6 +3993,12 @@
       "integrity": "sha512-ScaPdn1dQczgbl0QFTeTOmVHFULt394XJgOQNoyVhZ6r2vLnMLJfBPd53SB52T/3G36VI1/g2MZaX0cwDuXsfw==",
       "license": "MIT"
     },
+    "node_modules/@types/warning": {
+      "version": "3.0.3",
+      "resolved": "https://registry.npmjs.org/@types/warning/-/warning-3.0.3.tgz",
+      "integrity": "sha512-D1XC7WK8K+zZEveUPY+cf4+kgauk8N4eHr/XIHXGlGYkHLud6hK9lYfZk1ry1TNh798cZUCgb6MqGEG8DkJt6Q==",
+      "license": "MIT"
+    },
     "node_modules/@types/ws": {
       "version": "8.18.1",
       "resolved": "https://registry.npmjs.org/@types/ws/-/ws-8.18.1.tgz",
@@ -5279,6 +5402,25 @@
       "integrity": "sha512-JZOSA7Mo9sNGB8+UjSgzdLtokWAky1zbztM3WRLCbZ70/3cTANmQmOdR7y2g+J0e2WXywy1yS468tY+IruqEww==",
       "license": "ISC"
     },
+    "node_modules/bootstrap": {
+      "version": "5.3.7",
+      "resolved": "https://registry.npmjs.org/bootstrap/-/bootstrap-5.3.7.tgz",
+      "integrity": "sha512-7KgiD8UHjfcPBHEpDNg+zGz8L3LqR3GVwqZiBRFX04a1BCArZOz1r2kjly2HQ0WokqTO0v1nF+QAt8dsW4lKlw==",
+      "funding": [
+        {
+          "type": "github",
+          "url": "https://github.com/sponsors/twbs"
+        },
+        {
+          "type": "opencollective",
+          "url": "https://opencollective.com/bootstrap"
+        }
+      ],
+      "license": "MIT",
+      "peerDependencies": {
+        "@popperjs/core": "^2.11.8"
+      }
+    },
     "node_modules/brace-expansion": {
       "version": "1.1.12",
       "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.12.tgz",
@@ -5600,6 +5742,12 @@
       "integrity": "sha512-9z8TZaGM1pfswYeXrUpzPrkx8UnWYdhJclsiYMm6x/w5+nN+8Tf/LnAgfLGQCm59qAOxU8WwHEq2vNwF6i4j+Q==",
       "license": "MIT"
     },
+    "node_modules/classnames": {
+      "version": "2.5.1",
+      "resolved": "https://registry.npmjs.org/classnames/-/classnames-2.5.1.tgz",
+      "integrity": "sha512-saHYOzhIQs6wy2sVxTM6bUDsQO4F50V9RQ22qBpEdCW+I+/Wmke2HOl6lS6dTpdxVhb88/I6+Hs+438c3lfUow==",
+      "license": "MIT"
+    },
     "node_modules/clean-css": {
       "version": "5.3.3",
       "resolved": "https://registry.npmjs.org/clean-css/-/clean-css-5.3.3.tgz",
@@ -6362,6 +6510,12 @@
       "integrity": "sha512-b0tGHbfegbhPJpxpiBPU2sCkigAqtM9O121le6bbOlgyV+NyGyCmVfJ6QW9eRjz8CpNfWEOYBIMIGRYkLwsIYg==",
       "license": "MIT"
     },
+    "node_modules/csstype": {
+      "version": "3.1.3",
+      "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.1.3.tgz",
+      "integrity": "sha512-M1uQkMl8rQK/szD0LNhtqxIPLpimGm8sOBwU7lLnCpSbTyY3yeU1Vc7l4KT5zT4s/yOxHH5O7tIuuLOCnLADRw==",
+      "license": "MIT"
+    },
     "node_modules/damerau-levenshtein": {
       "version": "1.0.8",
       "resolved": "https://registry.npmjs.org/damerau-levenshtein/-/damerau-levenshtein-1.0.8.tgz",
@@ -6688,6 +6842,16 @@
         "utila": "~0.4"
       }
     },
+    "node_modules/dom-helpers": {
+      "version": "5.2.1",
+      "resolved": "https://registry.npmjs.org/dom-helpers/-/dom-helpers-5.2.1.tgz",
+      "integrity": "sha512-nRCa7CK3VTrM2NmGkIy4cbK7IZlgBE/PYMn55rrXefr5xXDP0LdtfPnblFDoVdcAfslJ7or6iqAUnx0CCGIWQA==",
+      "license": "MIT",
+      "dependencies": {
+        "@babel/runtime": "^7.8.7",
+        "csstype": "^3.0.2"
+      }
+    },
     "node_modules/dom-serializer": {
       "version": "1.4.1",
       "resolved": "https://registry.npmjs.org/dom-serializer/-/dom-serializer-1.4.1.tgz",
@@ -9249,6 +9413,15 @@
         "node": ">= 0.4"
       }
     },
+    "node_modules/invariant": {
+      "version": "2.2.4",
+      "resolved": "https://registry.npmjs.org/invariant/-/invariant-2.2.4.tgz",
+      "integrity": "sha512-phJfQVBuaJM5raOpJjSfkiD6BpbCE4Ns//LaXl6wGYtUBY83nWS6Rf9tXm2e8VaK60JEjYldbPif/A2B1C2gNA==",
+      "license": "MIT",
+      "dependencies": {
+        "loose-envify": "^1.0.0"
+      }
+    },
     "node_modules/ipaddr.js": {
       "version": "2.2.0",
       "resolved": "https://registry.npmjs.org/ipaddr.js/-/ipaddr.js-2.2.0.tgz",
@@ -13592,6 +13765,25 @@
         "react-is": "^16.13.1"
       }
     },
+    "node_modules/prop-types-extra": {
+      "version": "1.1.1",
+      "resolved": "https://registry.npmjs.org/prop-types-extra/-/prop-types-extra-1.1.1.tgz",
+      "integrity": "sha512-59+AHNnHYCdiC+vMwY52WmvP5dM3QLeoumYuEyceQDi9aEhtwN9zIQ2ZNo25sMyXnbh32h+P1ezDsUpUH3JAew==",
+      "license": "MIT",
+      "dependencies": {
+        "react-is": "^16.3.2",
+        "warning": "^4.0.0"
+      },
+      "peerDependencies": {
+        "react": ">=0.14.0"
+      }
+    },
+    "node_modules/prop-types-extra/node_modules/react-is": {
+      "version": "16.13.1",
+      "resolved": "https://registry.npmjs.org/react-is/-/react-is-16.13.1.tgz",
+      "integrity": "sha512-24e6ynE2H+OKt4kqsOvNd8kBpV65zoxbA4BVsEOB3ARVWQki/DHzaUoC5KuON/BiccDaCCTZBuOcfZs70kR8bQ==",
+      "license": "MIT"
+    },
     "node_modules/prop-types/node_modules/react-is": {
       "version": "16.13.1",
       "resolved": "https://registry.npmjs.org/react-is/-/react-is-16.13.1.tgz",
@@ -13773,6 +13965,49 @@
         "node": ">=14"
       }
     },
+    "node_modules/react-bootstrap": {
+      "version": "2.10.10",
+      "resolved": "https://registry.npmjs.org/react-bootstrap/-/react-bootstrap-2.10.10.tgz",
+      "integrity": "sha512-gMckKUqn8aK/vCnfwoBpBVFUGT9SVQxwsYrp9yDHt0arXMamxALerliKBxr1TPbntirK/HGrUAHYbAeQTa9GHQ==",
+      "license": "MIT",
+      "dependencies": {
+        "@babel/runtime": "^7.24.7",
+        "@restart/hooks": "^0.4.9",
+        "@restart/ui": "^1.9.4",
+        "@types/prop-types": "^15.7.12",
+        "@types/react-transition-group": "^4.4.6",
+        "classnames": "^2.3.2",
+        "dom-helpers": "^5.2.1",
+        "invariant": "^2.2.4",
+        "prop-types": "^15.8.1",
+        "prop-types-extra": "^1.1.0",
+        "react-transition-group": "^4.4.5",
+        "uncontrollable": "^7.2.1",
+        "warning": "^4.0.3"
+      },
+      "peerDependencies": {
+        "@types/react": ">=16.14.8",
+        "react": ">=16.14.0",
+        "react-dom": ">=16.14.0"
+      },
+      "peerDependenciesMeta": {
+        "@types/react": {
+          "optional": true
+        }
+      }
+    },
+    "node_modules/react-bootstrap-icons": {
+      "version": "1.11.6",
+      "resolved": "https://registry.npmjs.org/react-bootstrap-icons/-/react-bootstrap-icons-1.11.6.tgz",
+      "integrity": "sha512-ycXiyeSyzbS1C4+MlPTYe0riB+UlZ7LV7YZQYqlERV2cxDiKtntI0huHmP/3VVvzPt4tGxqK0K+Y6g7We3U6tQ==",
+      "license": "MIT",
+      "dependencies": {
+        "prop-types": "^15.7.2"
+      },
+      "peerDependencies": {
+        "react": ">=16.8.6"
+      }
+    },
     "node_modules/react-dev-utils": {
       "version": "12.0.1",
       "resolved": "https://registry.npmjs.org/react-dev-utils/-/react-dev-utils-12.0.1.tgz",
@@ -13902,6 +14137,12 @@
       "integrity": "sha512-w2GsyukL62IJnlaff/nRegPQR94C/XXamvMWmSHRJ4y7Ts/4ocGRmTHvOs8PSE6pB3dWOrD/nueuU5sduBsQ4w==",
       "license": "MIT"
     },
+    "node_modules/react-lifecycles-compat": {
+      "version": "3.0.4",
+      "resolved": "https://registry.npmjs.org/react-lifecycles-compat/-/react-lifecycles-compat-3.0.4.tgz",
+      "integrity": "sha512-fBASbA6LnOU9dOU2eW7aQ8xmYBSXUIWr+UmF9b1efZBazGNO+rcXT/icdKnYm2pTwcRylVUYwW7H1PHfLekVzA==",
+      "license": "MIT"
+    },
     "node_modules/react-refresh": {
       "version": "0.11.0",
       "resolved": "https://registry.npmjs.org/react-refresh/-/react-refresh-0.11.0.tgz",
@@ -13911,6 +14152,66 @@
         "node": ">=0.10.0"
       }
     },
+    "node_modules/react-router": {
+      "version": "7.8.2",
+      "resolved": "https://registry.npmjs.org/react-router/-/react-router-7.8.2.tgz",
+      "integrity": "sha512-7M2fR1JbIZ/jFWqelpvSZx+7vd7UlBTfdZqf6OSdF9g6+sfdqJDAWcak6ervbHph200ePlu+7G8LdoiC3ReyAQ==",
+      "license": "MIT",
+      "dependencies": {
+        "cookie": "^1.0.1",
+        "set-cookie-parser": "^2.6.0"
+      },
+      "engines": {
+        "node": ">=20.0.0"
+      },
+      "peerDependencies": {
+        "react": ">=18",
+        "react-dom": ">=18"
+      },
+      "peerDependenciesMeta": {
+        "react-dom": {
+          "optional": true
+        }
+      }
+    },
+    "node_modules/react-router-bootstrap": {
+      "version": "0.26.3",
+      "resolved": "https://registry.npmjs.org/react-router-bootstrap/-/react-router-bootstrap-0.26.3.tgz",
+      "integrity": "sha512-cBgcWekti6lFRl/vXP8ZfKuA/0Qe7L5xBjQ6OwbGI30+NSAAH/YZGbO6whSeBWFILn6uTVOX939HDGhs+5WzOw==",
+      "license": "Apache-2.0",
+      "dependencies": {
+        "prop-types": "^15.7.2"
+      },
+      "peerDependencies": {
+        "react": ">=16.13.1",
+        "react-router-dom": ">=6.0.0"
+      }
+    },
+    "node_modules/react-router-dom": {
+      "version": "7.8.2",
+      "resolved": "https://registry.npmjs.org/react-router-dom/-/react-router-dom-7.8.2.tgz",
+      "integrity": "sha512-Z4VM5mKDipal2jQ385H6UBhiiEDlnJPx6jyWsTYoZQdl5TrjxEV2a9yl3Fi60NBJxYzOTGTTHXPi0pdizvTwow==",
+      "license": "MIT",
+      "dependencies": {
+        "react-router": "7.8.2"
+      },
+      "engines": {
+        "node": ">=20.0.0"
+      },
+      "peerDependencies": {
+        "react": ">=18",
+        "react-dom": ">=18"
+      }
+    },
+    "node_modules/react-router/node_modules/cookie": {
+      "version": "1.0.2",
+      "resolved": "https://registry.npmjs.org/cookie/-/cookie-1.0.2.tgz",
+      "integrity": "sha512-9Kr/j4O16ISv8zBBhJoi4bXOYNTkFLOqSL3UDB0njXxCXNezjeyVrJyGOWtgfs/q2km1gwBcfH8q1yEGoMYunA==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=18"
+      }
+    },
     "node_modules/react-scripts": {
       "version": "5.0.1",
       "resolved": "https://registry.npmjs.org/react-scripts/-/react-scripts-5.0.1.tgz",
@@ -13984,6 +14285,22 @@
         }
       }
     },
+    "node_modules/react-transition-group": {
+      "version": "4.4.5",
+      "resolved": "https://registry.npmjs.org/react-transition-group/-/react-transition-group-4.4.5.tgz",
+      "integrity": "sha512-pZcd1MCJoiKiBR2NRxeCRg13uCXbydPnmB4EOeRrY7480qNWO8IIgQG6zlDkm6uRMsURXPuKq0GWtiM59a5Q6g==",
+      "license": "BSD-3-Clause",
+      "dependencies": {
+        "@babel/runtime": "^7.5.5",
+        "dom-helpers": "^5.0.1",
+        "loose-envify": "^1.4.0",
+        "prop-types": "^15.6.2"
+      },
+      "peerDependencies": {
+        "react": ">=16.6.0",
+        "react-dom": ">=16.6.0"
+      }
+    },
     "node_modules/read-cache": {
       "version": "1.0.0",
       "resolved": "https://registry.npmjs.org/read-cache/-/read-cache-1.0.0.tgz",
@@ -14817,6 +15134,12 @@
         "node": ">= 0.8.0"
       }
     },
+    "node_modules/set-cookie-parser": {
+      "version": "2.7.1",
+      "resolved": "https://registry.npmjs.org/set-cookie-parser/-/set-cookie-parser-2.7.1.tgz",
+      "integrity": "sha512-IOc8uWeOZgnb3ptbCURJWNjWUPcO3ZnTTdzsurqERrP6nPyv+paC55vJM0LpOlT2ne+Ix+9+CRG1MNLlyZ4GjQ==",
+      "license": "MIT"
+    },
     "node_modules/set-function-length": {
       "version": "1.2.2",
       "resolved": "https://registry.npmjs.org/set-function-length/-/set-function-length-1.2.2.tgz",
@@ -16373,6 +16696,21 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
+    "node_modules/uncontrollable": {
+      "version": "7.2.1",
+      "resolved": "https://registry.npmjs.org/uncontrollable/-/uncontrollable-7.2.1.tgz",
+      "integrity": "sha512-svtcfoTADIB0nT9nltgjujTi7BzVmwjZClOmskKu/E8FW9BXzg9os8OLr4f8Dlnk0rYWJIWr4wv9eKUXiQvQwQ==",
+      "license": "MIT",
+      "dependencies": {
+        "@babel/runtime": "^7.6.3",
+        "@types/react": ">=16.9.11",
+        "invariant": "^2.2.4",
+        "react-lifecycles-compat": "^3.0.4"
+      },
+      "peerDependencies": {
+        "react": ">=15.0.0"
+      }
+    },
     "node_modules/underscore": {
       "version": "1.12.1",
       "resolved": "https://registry.npmjs.org/underscore/-/underscore-1.12.1.tgz",
@@ -16625,6 +16963,15 @@
         "makeerror": "1.0.12"
       }
     },
+    "node_modules/warning": {
+      "version": "4.0.3",
+      "resolved": "https://registry.npmjs.org/warning/-/warning-4.0.3.tgz",
+      "integrity": "sha512-rpJyN222KWIvHJ/F53XSZv0Zl/accqHR8et1kpaMTD/fLCRxtV8iX8czMzY7sVZupTI3zcUTg8eycS2kNF9l6w==",
+      "license": "MIT",
+      "dependencies": {
+        "loose-envify": "^1.0.0"
+      }
+    },
     "node_modules/watchpack": {
       "version": "2.4.4",
       "resolved": "https://registry.npmjs.org/watchpack/-/watchpack-2.4.4.tgz",
diff --git a/package.json b/package.json
index d6fdd9c..2c9dea6 100644
--- a/package.json
+++ b/package.json
@@ -7,13 +7,18 @@
     "@testing-library/jest-dom": "^6.8.0",
     "@testing-library/react": "^16.3.0",
     "@testing-library/user-event": "^13.5.0",
+    "bootstrap": "^5.3.7",
     "react": "^19.1.1",
+    "react-bootstrap": "^2.10.10",
+    "react-bootstrap-icons": "^1.11.6",
     "react-dom": "^19.1.1",
+    "react-router-bootstrap": "^0.26.3",
+    "react-router-dom": "^7.8.2",
     "react-scripts": "5.0.1",
     "web-vitals": "^2.1.4"
   },
   "scripts": {
-    "start": "react-scripts start",
+    "start": "set PORT=3001 && react-scripts start",
     "build": "react-scripts build",
     "test": "react-scripts test",
     "eject": "react-scripts eject"
diff --git a/src/App.css b/src/App.css
index 74b5e05..9bd9fbd 100644
--- a/src/App.css
+++ b/src/App.css
@@ -1,38 +1,138 @@
-.App {
-  text-align: center;
+@import url('https://fonts.googleapis.com/css2?family=Nanum+Square:wght@400;700;800&display=swap');
+
+/* General Body Styles */
+body {
+  background-color: #f4f7f9; /* A light, neutral background */
+  color: #333;
+  font-family: 'Nanum Square', sans-serif;
 }
 
-.App-logo {
-  height: 40vmin;
-  pointer-events: none;
+/* Custom Card for main content areas */
+.card-custom {
+  background-color: #ffffff;
+  border-radius: 8px;
+  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
+  padding: 2rem;
+  border: none;
+  margin-top: 2rem;
 }
 
-@media (prefers-reduced-motion: no-preference) {
-  .App-logo {
-    animation: App-logo-spin infinite 20s linear;
-  }
+/* Custom Table Header */
+.table-header-custom th {
+  background-color: #e9ecef; /* A light grey for headers */
+  color: #495057;
+  border-bottom: 2px solid #dee2e6;
+  font-weight: 600;
 }
 
-.App-header {
-  background-color: #282c34;
-  min-height: 100vh;
-  display: flex;
-  flex-direction: column;
-  align-items: center;
-  justify-content: center;
-  font-size: calc(10px + 2vmin);
-  color: white;
+/* Custom Button Styles */
+.btn-primary {
+  background-color: #007bff; /* A professional blue */
+  border-color: #007bff;
+}
+
+.btn-primary:hover {
+  background-color: #0056b3;
+  border-color: #0056b3;
 }
 
-.App-link {
-  color: #61dafb;
+/* Custom Navbar */
+.navbar-custom {
+  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
+}
+
+/* Custom Modal Header */
+.modal-header-custom {
+  background-color: #f8f9fa;
+  border-bottom: 1px solid #dee2e6;
+}
+
+/* Utility for icon alignment */
+.icon-text {
+  display: inline-flex;
+  align-items: center;
+  gap: 0.5rem; /* space between icon and text */
 }
 
-@keyframes App-logo-spin {
-  from {
-    transform: rotate(0deg);
+/* Responsive Mobile View */
+@media (max-width: 768px) {
+  .card-custom {
+    padding: 1rem;
+    margin-top: 1rem;
+  }
+
+  .mobile-card {
+    margin-bottom: 1rem;
+    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
+  }
+
+  .mobile-card .card-body {
+    padding: 1rem;
+  }
+
+  .mobile-card-row {
+    display: flex;
+    justify-content: space-between;
+    padding: 0.5rem 0;
+    border-bottom: 1px solid #eee;
+  }
+  
+  .mobile-card-row:last-child {
+    border-bottom: none;
+  }
+
+  .mobile-card-label {
+    font-weight: 600;
+    color: #555;
   }
-  to {
-    transform: rotate(360deg);
+
+  .mobile-card-value {
+    text-align: right;
+  }
+  
+  .mobile-totals-card {
+    margin-top: 1rem;
+  }
+}
+
+/* Customer Card List */
+.customer-list {
+  margin-top: 1rem;
+}
+
+.customer-card {
+  border: 1px solid #e9ecef;
+  border-radius: 8px;
+  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
+  transition: box-shadow 0.3s ease-in-out;
+}
+
+.customer-card:hover {
+  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
+}
+
+.customer-card .card-header {
+  background-color: #f8f9fa;
+  font-weight: bold;
+}
+
+.customer-card .customer-name {
+  color: #007bff;
+  font-size: 1.1rem;
+}
+
+.customer-card .card-body p {
+  margin-bottom: 0.5rem;
+}
+
+.customer-card .card-footer {
+  background-color: #f8f9fa;
+  font-weight: bold;
+  color: #333;
+}
+
+@media (max-width: 991.98px) {
+  main {
+    padding-bottom: 70px; /* Adjust this value based on the actual height of your bottom nav */
   }
 }
diff --git a/src/App.js b/src/App.js
index 3784575..1ea7049 100644
--- a/src/App.js
+++ b/src/App.js
@@ -1,25 +1,32 @@
-import logo from './logo.svg';
-import './App.css';
+import React from 'react';
+import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
+import NavigationBar from './components/NavigationBar';
+import { Container } from 'react-bootstrap';
+import BottomNavigationBar from './components/BottomNavigationBar'; // Import BottomNavigationBar
+import Sales from './pages/Sales';
+import Customers from './pages/Customers';
+import Marketing from './pages/Marketing';
+import './App.css'; // Import custom CSS
 
 function App() {
   return (
-    <div class="App">
-      <header class="App-header">
-        <img src={logo} class="App-logo" alt="logo" />
-        <p>
-          Edit <code>src/App.js</code> and save to reload.
-        </p>
-        <a
-          class="App-link"
-          href="https://reactjs.org"
-          target="_blank"
-          rel="noopener noreferrer"
-        >
-          Learn React
-        </a>
-      </header>
-    </div>
+    <Router>
+      <div class="d-flex flex-column h-100">
+        <NavigationBar />
+        <main class="flex-grow-1">
+          <Container class="py-3">
+            <Routes>
+              <Route path="/" element={<Sales />} />
+              <Route path="/sales" element={<Sales />} />
+              <Route path="/customers" element={<Customers />} />
+              <Route path="/marketing" element={<Marketing />} />
+            </Routes>
+          </Container>
+        </main>
+        <BottomNavigationBar />
+      </div>
+    </Router>
   );
 }
 
-export default App;
+export default App;
\ No newline at end of file
diff --git a/src/components/BottomNavigationBar.css b/src/components/BottomNavigationBar.css
new file mode 100644
index 0000000..cd8faa5
--- /dev/null
+++ b/src/components/BottomNavigationBar.css
@@ -0,0 +1,19 @@
+.bottom-nav {
+  background-color: #ffffff;
+  border-top: 1px solid #dee2e6;
+  box-shadow: 0 -2px 4px rgba(0,0,0,0.05);
+}
+
+.bottom-nav .nav-link {
+  color: #6c757d;
+  font-size: 0.75rem;
+  padding: 0.5rem 0;
+}
+
+.bottom-nav .nav-link.active {
+  color: #007bff;
+}
+
+.bottom-nav .nav-link svg {
+  margin-bottom: 0.25rem;
+}
\ No newline at end of file
diff --git a/src/components/BottomNavigationBar.js b/src/components/BottomNavigationBar.js
new file mode 100644
index 0000000..6aec972
--- /dev/null
+++ b/src/components/BottomNavigationBar.js
@@ -0,0 +1,34 @@
+import React from 'react';
+import { Nav, Navbar } from 'react-bootstrap';
+import { LinkContainer } from 'react-router-bootstrap';
+import { HouseFill, PeopleFill, GraphUp } from 'react-bootstrap-icons';
+import './BottomNavigationBar.css';
+
+const BottomNavigationBar = () => {
+  return (
+    <Navbar fixed="bottom" class="bottom-nav d-lg-none">
+      <Nav class="w-100 justify-content-around">
+        <LinkContainer to="/sales">
+          <Nav.Link class="text-center">
+            <HouseFill size={24} />
+            <div>판매</div>
+          </Nav.Link>
+        </LinkContainer>
+        <LinkContainer to="/customers">
+          <Nav.Link class="text-center">
+            <PeopleFill size={24} />
+            <div>고객</div>
+          </Nav.Link>
+        </LinkContainer>
+        <LinkContainer to="/marketing">
+          <Nav.Link class="text-center">
+            <GraphUp size={24} />
+            <div>분석</div>
+          </Nav.Link>
+        </LinkContainer>
+      </Nav>
+    </Navbar>
+  );
+};
+
+export default BottomNavigationBar;
\ No newline at end of file
diff --git a/src/components/NavigationBar.js b/src/components/NavigationBar.js
new file mode 100644
index 0000000..315efa8
--- /dev/null
+++ b/src/components/NavigationBar.js
@@ -0,0 +1,24 @@
+import React from 'react';
+import { Container, Navbar, Nav } from 'react-bootstrap';
+import { Link } from 'react-router-dom';
+import { HouseDoorFill, PeopleFill, MegaphoneFill } from 'react-bootstrap-icons';
+
+function NavigationBar() {
+  return (
+    <Navbar bg="light" variant="light" class="navbar-custom d-none d-lg-block">
+      <Container>
+        <Navbar.Brand as={Link} to="/"><strong>EVERY PAY</strong></Navbar.Brand>
+        <Navbar.Toggle aria-controls="basic-navbar-nav" />
+        <Navbar.Collapse id="basic-navbar-nav">
+          <Nav class="ms-auto">
+            <Nav.Link as={Link} to="/" class="icon-text"><HouseDoorFill /> 매출 기록</Nav.Link>
+            <Nav.Link as={Link} to="/customers" class="icon-text"><PeopleFill /> 고객 관리</Nav.Link>
+            <Nav.Link as={Link} to="/marketing" class="icon-text"><MegaphoneFill /> 마케팅</Nav.Link>
+          </Nav>
+        </Navbar.Collapse>
+      </Container>
+    </Navbar>
+  );
+}
+
+export default NavigationBar;
\ No newline at end of file
diff --git a/src/index.css b/src/index.css
index ec2585e..55ede02 100644
--- a/src/index.css
+++ b/src/index.css
@@ -1,3 +1,12 @@
+html, body, #root {
+  height: 100%;
+}
+
+#root {
+  display: flex;
+  flex-direction: column;
+}
+
 body {
   margin: 0;
   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
diff --git a/src/index.js b/src/index.js
index d563c0f..e0d6378 100644
--- a/src/index.js
+++ b/src/index.js
@@ -1,17 +1,11 @@
 import React from 'react';
 import ReactDOM from 'react-dom/client';
-import './index.css';
+import 'bootstrap/dist/css/bootstrap.min.css';
 import App from './App';
-import reportWebVitals from './reportWebVitals';
 
 const root = ReactDOM.createRoot(document.getElementById('root'));
 root.render(
   <React.StrictMode>
     <App />
   </React.StrictMode>
-);
-
-// If you want to start measuring performance in your app, pass a function
-// to log results (for example: reportWebVitals(console.log))
-// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
-reportWebVitals();
+);
\ No newline at end of file
diff --git a/src/pages/Customers.js b/src/pages/Customers.js
new file mode 100644
index 0000000..2425cea
--- /dev/null
+++ b/src/pages/Customers.js
@@ -0,0 +1,283 @@
+import React, { useState, useEffect } from 'react';
+import { Container, Form, Button, Table, ButtonGroup, Modal, Row, Col, Alert, Card } from 'react-bootstrap';
+import { PlusCircleFill, PencilFill, TrashFill } from 'react-bootstrap-icons';
+
+// Helper Functions
+const formatCurrency = (value) => Math.floor(value || 0).toLocaleString();
+const getStartOfWeek = (date) => {
+  const d = new Date(date);
+  const day = d.getDay();
+  const diff = d.getDate() - day;
+  return new Date(d.setDate(diff));
+};
+
+// Customer Add/Edit Modal Component
+const CustomerModal = ({ show, onHide, onSave, customer }) => {
+  const [name, setName] = useState('');
+  const [phone, setPhone] = useState('');
+  const [cardNumber, setCardNumber] = useState('');
+  const [bankName, setBankName] = useState('');
+  const [accountNumber, setAccountNumber] = useState('');
+  const [carrier, setCarrier] = useState('');
+  const [birthdate, setBirthdate] = useState('');
+  const [pwHint, setPwHint] = useState('');
+  const [memo, setMemo] = useState('');
+
+  useEffect(() => {
+    if (customer) {
+      setName(customer.name);
+      setPhone(customer.phone);
+      setCardNumber(customer.cardNumber || '');
+      setBankName(customer.bankName || '');
+      setAccountNumber(customer.accountNumber || '');
+      setCarrier(customer.carrier || '');
+      setBirthdate(customer.birthdate || '');
+      setPwHint(customer.pw_hint || '');
+      setMemo(customer.memo || '');
+    } else {
+      setName('');
+      setPhone('');
+      setCardNumber('');
+      setBankName('');
+      setAccountNumber('');
+      setCarrier('');
+      setBirthdate('');
+      setPwHint('');
+      setMemo('');
+    }
+  }, [customer]);
+
+  const handleSave = () => {
+    if (!name || !phone) {
+      alert('이름과 전화번호는 필수 항목입니다.');
+      return;
+    }
+    onSave({ ...customer, name, phone, cardNumber, bankName, accountNumber, carrier, birthdate, pw_hint: pwHint, memo });
+  };
+
+  return (
+    <Modal show={show} onHide={onHide} size="lg">
+      <Modal.Header closeButton class="modal-header-custom">
+        <Modal.Title>{customer ? '고객 정보 수정' : '신규 고객 추가'}</Modal.Title>
+      </Modal.Header>
+      <Modal.Body>
+        <Row>
+          <Col md={6}>
+            <Form.Group class="mb-3"><Form.Label>이름</Form.Label><Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required /></Form.Group>
+            <Form.Group class="mb-3"><Form.Label>전화번호</Form.Label><Form.Control type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required /></Form.Group>
+            <Form.Group class="mb-3"><Form.Label>생년월일</Form.Label><Form.Control type="text" placeholder="YYMMDD" maxLength={6} value={birthdate} onChange={(e) => setBirthdate(e.target.value)} /></Form.Group>
+            <Form.Group class="mb-3">
+              <Form.Label>통신사</Form.Label>
+              <Form.Select value={carrier} onChange={(e) => setCarrier(e.target.value)}>
+                <option value="">통신사를 선택하세요</option>
+                <option value="SKT">SKT</option>
+                <option value="KT">KT</option>
+                <option value="LG U+">LG U+</option>
+                <option value="SKT 알뜰폰">SKT 알뜰폰</option>
+                <option value="KT 알뜰폰">KT 알뜰폰</option>
+                <option value="LG U+ 알뜰폰">LG U+ 알뜰폰</option>
+              </Form.Select>
+            </Form.Group>
+            <Form.Group class="mb-3"><Form.Label>비밀번호 앞 2자리</Form.Label><Form.Control type="text" value={pwHint} onChange={(e) => setPwHint(e.target.value)} maxLength={2} /></Form.Group>
+          </Col>
+          <Col md={6}>
+            <Form.Group class="mb-3"><Form.Label>카드번호</Form.Label><Form.Control type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} /></Form.Group>
+            <Form.Group class="mb-3"><Form.Label>은행명</Form.Label><Form.Control type="text" value={bankName} onChange={(e) => setBankName(e.target.value)} /></Form.Group>
+            <Form.Group class="mb-3"><Form.Label>은행계좌</Form.Label><Form.Control type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} /></Form.Group>
+          </Col>
+        </Row>
+        <Form.Group class="mb-3"><Form.Label>메모</Form.Label><Form.Control as="textarea" rows={3} value={memo} onChange={(e) => setMemo(e.target.value)} /></Form.Group>
+      </Modal.Body>
+      <Modal.Footer>
+        <Button variant="secondary" onClick={onHide}>취소</Button>
+        <Button variant="primary" onClick={handleSave}>저장</Button>
+      </Modal.Footer>
+    </Modal>
+  );
+};
+
+function Customers() {
+  const [customers, setCustomers] = useState([]);
+  const [sales, setSales] = useState([]);
+  const [customersWithSales, setCustomersWithSales] = useState([]);
+  const [showDetailsModal, setShowDetailsModal] = useState(false);
+  const [showEditModal, setShowEditModal] = useState(false);
+  const [selectedCustomer, setSelectedCustomer] = useState(null);
+  const [editingCustomer, setEditingCustomer] = useState(null);
+  const [detailsMemo, setDetailsMemo] = useState('');
+  const [showMemoSaveAlert, setShowMemoSaveAlert] = useState(false);
+  const [modalFilterType, setModalFilterType] = useState('all');
+  const [modalSelectedDate, setModalSelectedDate] = useState(new Date().toISOString().slice(0, 10));
+  const [modalFilteredSales, setModalFilteredSales] = useState([]);
+
+  useEffect(() => {
+    const savedCustomers = localStorage.getItem('customers');
+    if (savedCustomers) setCustomers(JSON.parse(savedCustomers));
+    const savedSales = localStorage.getItem('sales');
+    if (savedSales) setSales(JSON.parse(savedSales));
+  }, []);
+
+  useEffect(() => {
+    const combinedData = customers.map(customer => {
+      const customerSales = sales.filter(sale => sale.phone === customer.phone);
+      const totalSales = customerSales.reduce((total, sale) => total + sale.amount, 0);
+      return { ...customer, totalSales, sales: customerSales };
+    }).sort((a, b) => a.name.localeCompare(b.name));
+    setCustomersWithSales(combinedData);
+  }, [customers, sales]);
+
+  useEffect(() => {
+    if (!selectedCustomer) return;
+    let result = selectedCustomer.sales;
+    const filterDate = new Date(modalSelectedDate);
+    switch (modalFilterType) {
+      case 'day': result = selectedCustomer.sales.filter(sale => sale.date === modalSelectedDate); break;
+      case 'week':
+        const startOfWeek = getStartOfWeek(filterDate);
+        const endOfWeek = new Date(startOfWeek); endOfWeek.setDate(startOfWeek.getDate() + 6);
+        result = selectedCustomer.sales.filter(s => { const d = new Date(s.date); return d >= startOfWeek && d <= endOfWeek; });
+        break;
+      case 'month':
+        result = selectedCustomer.sales.filter(s => { const d = new Date(s.date); return d.getFullYear() === filterDate.getFullYear() && d.getMonth() === filterDate.getMonth(); });
+        break;
+      default: result = selectedCustomer.sales; break;
+    }
+    setModalFilteredSales(result);
+  }, [selectedCustomer, modalFilterType, modalSelectedDate]);
+
+  const handleSaveCustomer = (customerData) => {
+    let updatedCustomers;
+    if (customerData.id) {
+      updatedCustomers = customers.map(c => c.id === customerData.id ? { ...c, ...customerData } : c);
+    } else {
+      updatedCustomers = [...customers, { ...customerData, id: Date.now() }];
+    }
+    setCustomers(updatedCustomers);
+    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
+    setShowEditModal(false);
+  };
+
+  const handleDeleteClick = (customerId) => {
+    if (window.confirm('정말로 이 고객을 삭제하시겠습니까? 관련 매출 기록은 삭제되지 않습니다.')) {
+      const updatedCustomers = customers.filter(c => c.id !== customerId);
+      setCustomers(updatedCustomers);
+      localStorage.setItem('customers', JSON.stringify(updatedCustomers));
+    }
+  };
+
+  const handleDetailsClick = (customer) => {
+    setSelectedCustomer(customer);
+    setDetailsMemo(customer.memo || '');
+    setModalFilterType('all');
+    setModalSelectedDate(new Date().toISOString().slice(0, 10));
+    setShowDetailsModal(true);
+  };
+  
+  const handleSaveMemo = () => {
+    if (!selectedCustomer) return;
+    const updatedCustomers = customers.map(c => c.id === selectedCustomer.id ? { ...c, memo: detailsMemo } : c);
+    setCustomers(updatedCustomers);
+    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
+    setShowMemoSaveAlert(true);
+    setTimeout(() => setShowMemoSaveAlert(false), 2000);
+  };
+
+  const modalTotalAmount = modalFilteredSales.reduce((total, sale) => total + sale.amount, 0);
+  const modalTotalCommission = modalFilteredSales.reduce((total, sale) => total + sale.commission, 0);
+  const modalTotalRemittance = modalFilteredSales.reduce((total, sale) => total + sale.remittance, 0);
+  const modalTotalProfit = modalFilteredSales.reduce((total, sale) => total + sale.profit, 0);
+  const modalTotalBonus = modalFilteredSales.reduce((total, sale) => total + (sale.bonus || 0), 0);
+
+  return (
+    <Container class="mt-4">
+      <Card class="card-custom">
+        <Card.Body>
+          <Row class="align-items-center mb-3">
+            <Col><h2>고객 목록</h2></Col>
+            <Col class="text-end"><Button onClick={() => { setEditingCustomer(null); setShowEditModal(true); }} class="icon-text"><PlusCircleFill /> 신규 고객 추가</Button></Col>
+          </Row>
+          
+          <div class="customer-list">
+            {customersWithSales.map((customer, index) => (
+              <Card key={customer.id} class="mb-3 customer-card">
+                <Card.Header onClick={() => handleDetailsClick(customer)} style={{ cursor: 'pointer' }}>
+                  <Row class="align-items-center">
+                    <Col>
+                      <strong class="customer-name">{customer.name}</strong>
+                    </Col>
+                    <Col class="text-end">
+                      <ButtonGroup size="sm">
+                        <Button variant="outline-secondary" onClick={(e) => { e.stopPropagation(); setEditingCustomer(customer); setShowEditModal(true); }}><PencilFill /></Button>
+                        <Button variant="outline-danger" onClick={(e) => { e.stopPropagation(); handleDeleteClick(customer.id); }}><TrashFill /></Button>
+                      </ButtonGroup>
+                    </Col>
+                  </Row>
+                </Card.Header>
+                <Card.Body onClick={() => handleDetailsClick(customer)} style={{ cursor: 'pointer' }}>
+                  <Row>
+                    <Col xs={12} md={6}><p><strong>전화번호:</strong> {customer.phone}</p></Col>
+                    <Col xs={12} md={6}><p><strong>생년월일:</strong> {customer.birthdate}</p></Col>
+                    <Col xs={12} md={6}><p><strong>통신사:</strong> {customer.carrier}</p></Col>
+                    <Col xs={12} md={6}><p><strong>카드번호:</strong> {customer.cardNumber}</p></Col>
+                    <Col xs={12} md={6}><p><strong>은행명:</strong> {customer.bankName}</p></Col>
+                    <Col xs={12} md={6}><p><strong>은행계좌:</strong> {customer.accountNumber}</p></Col>
+                  </Row>
+                </Card.Body>
+                <Card.Footer onClick={() => handleDetailsClick(customer)} style={{ cursor: 'pointer' }}>
+                  <strong>총 매출액: {formatCurrency(customer.totalSales)} 원</strong>
+                </Card.Footer>
+              </Card>
+            ))}
+          </div>
+        </Card.Body>
+      </Card>
+
+      <CustomerModal show={showEditModal} onHide={() => setShowEditModal(false)} onSave={handleSaveCustomer} customer={editingCustomer} />
+
+      {selectedCustomer && (
+        <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="xl">
+          <Modal.Header closeButton class="modal-header-custom"><Modal.Title>{selectedCustomer.name} 님의 상세 정보</Modal.Title></Modal.Header>
+          <Modal.Body>
+            <Row>
+              <Col md={8}>
+                <h5>거래 기록</h5>
+                <Form class="mb-3">
+                  <Row class="align-items-end">
+                    <Col md={6}><Form.Group controlId="modalFilterDate"><Form.Label>날짜 선택</Form.Label><Form.Control type="date" value={modalSelectedDate} onChange={(e) => setModalSelectedDate(e.target.value)} /></Form.Group></Col>
+                    <Col md={6}><Form.Group controlId="modalFilterType"><Form.Label>검색 단위</Form.Label><Form.Select value={modalFilterType} onChange={(e) => setModalFilterType(e.target.value)}><option value="all">전체</option><option value="day">일별</option><option value="week">주별</option><option value="month">월별</option></Form.Select></Form.Group></Col>
+                  </Row>
+                </Form>
+                {modalFilteredSales.length > 0 ? (
+                  <Table striped bordered hover responsive size="sm">
+                    <thead class="table-header-custom"><tr><th>날짜</th><th>결제금액</th><th>수수료</th><th>송금액</th><th>수익</th><th>보너스</th></tr></thead>
+                    <tbody>
+                      {modalFilteredSales.map(sale => (
+                        <tr key={sale.id}><td>{sale.date}</td><td>{formatCurrency(sale.amount)} 원</td><td>{formatCurrency(sale.commission)} 원</td><td>{formatCurrency(sale.remittance)} 원</td><td>{formatCurrency(sale.profit)} 원</td><td>{formatCurrency(sale.bonus)} 원</td></tr>
+                      ))}
+                    </tbody>
+                    <tfoot>
+                      <tr><td class="text-end"><strong>총계</strong></td><td><strong>{formatCurrency(modalTotalAmount)} 원</strong></td><td><strong>{formatCurrency(modalTotalCommission)} 원</strong></td><td><strong>{formatCurrency(modalTotalRemittance)} 원</strong></td><td><strong>{formatCurrency(modalTotalProfit)} 원</strong></td><td><strong>{formatCurrency(modalTotalBonus)} 원</strong></td></tr>
+                    </tfoot>
+                  </Table>
+                ) : (<p>선택된 기간에 이 고객의 거래 기록이 없습니다.</p>)}
+              </Col>
+              <Col md={4} class="border-start">
+                <h5>메모</h5>
+                <Form.Group controlId="detailsMemo">
+                  <Form.Control as="textarea" rows={10} value={detailsMemo} onChange={(e) => setDetailsMemo(e.target.value)} placeholder="고객에 대한 특징이나 메모를 남겨보세요."/>
+                </Form.Group>
+              </Col>
+            </Row>
+          </Modal.Body>
+          <Modal.Footer>
+            {showMemoSaveAlert && <Alert variant="success" class="me-auto p-2">메모가 저장되었습니다!</Alert>}
+            <Button variant="primary" onClick={handleSaveMemo}>메모 저장</Button>
+            <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>닫기</Button>
+          </Modal.Footer>
+        </Modal>
+      )}
+    </Container>
+  );
+}
+
+export default Customers;
\ No newline at end of file
diff --git a/src/pages/Marketing.js b/src/pages/Marketing.js
new file mode 100644
index 0000000..5c50713
--- /dev/null
+++ b/src/pages/Marketing.js
@@ -0,0 +1,13 @@
+import React from 'react';
+import { Container } from 'react-bootstrap';
+
+function Marketing() {
+  return (
+    <Container class="mt-4">
+      <h2>마케팅</h2>
+      <p>이곳에 마케팅 관련 기능이 구현될 예정입니다.</p>
+    </Container>
+  );
+}
+
+export default Marketing;
diff --git a/src/pages/Sales.js b/src/pages/Sales.js
new file mode 100644
index 0000000..87f9b19
--- /dev/null
+++ b/src/pages/Sales.js
@@ -0,0 +1,240 @@
+import React, { useState, useEffect } from 'react';
+import { Container, Form, Button, Table, Row, Col, Modal, ButtonGroup, Card } from 'react-bootstrap';
+import { PlusCircleFill, PencilFill, TrashFill } from 'react-bootstrap-icons';
+
+// Helper functions
+const getStartOfWeek = (date) => {
+  const d = new Date(date);
+  const day = d.getDay();
+  const diff = d.getDate() - day;
+  return new Date(d.setDate(diff));
+};
+const formatCurrency = (value) => Math.floor(value || 0).toLocaleString();
+
+// Constants
+const COMMISSION_RATE = 0.066;
+const REMITTANCE_RATE = 0.901;
+const PROFIT_RATE = 1 - COMMISSION_RATE - REMITTANCE_RATE;
+const BONUS_RATE = 0.009;
+
+// Sale Edit/Add Modal Component
+const SaleModal = ({ show, onHide, onSave, sale }) => {
+  const [date, setDate] = useState('');
+  const [name, setName] = useState('');
+  const [phone, setPhone] = useState('');
+  const [amount, setAmount] = useState('');
+
+  useEffect(() => {
+    if (sale) {
+      setDate(sale.date);
+      setName(sale.name);
+      setPhone(sale.phone);
+      setAmount(sale.amount);
+    } else {
+      setDate(new Date().toISOString().slice(0, 10));
+      setName('');
+      setPhone('');
+      setAmount('');
+    }
+  }, [sale]);
+
+  const handleSave = () => {
+    if (!name || !phone || !amount) {
+      alert('모든 항목을 입력해주세요.');
+      return;
+    }
+    const saleAmount = parseFloat(amount);
+    onSave({
+      ...sale,
+      date, name, phone, amount: saleAmount,
+      commission: saleAmount * COMMISSION_RATE,
+      remittance: saleAmount * REMITTANCE_RATE,
+      profit: saleAmount * PROFIT_RATE,
+      bonus: saleAmount * BONUS_RATE
+    });
+  };
+
+  return (
+    <Modal show={show} onHide={onHide} size="lg">
+      <Modal.Header closeButton class="modal-header-custom">
+        <Modal.Title>{sale ? '매출 수정' : '신규 매출 기록'}</Modal.Title>
+      </Modal.Header>
+      <Modal.Body>
+        <Form.Group class="mb-3"><Form.Label>날짜</Form.Label><Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} required /></Form.Group>
+        <Form.Group class="mb-3"><Form.Label>이름</Form.Label><Form.Control type="text" placeholder="이름을 입력하세요" value={name} onChange={(e) => setName(e.target.value)} required /></Form.Group>
+        <Form.Group class="mb-3"><Form.Label>전화번호</Form.Label><Form.Control type="tel" placeholder="전화번호를 입력하세요" value={phone} onChange={(e) => setPhone(e.target.value)} required /></Form.Group>
+        <Row>
+          <Col md={6}><Form.Group class="mb-3"><Form.Label>결제금액</Form.Label><Form.Control type="number" placeholder="결제금액" value={amount} onChange={(e) => setAmount(e.target.value)} required /></Form.Group></Col>
+          <Col md={6}><Form.Group class="mb-3"><Form.Label>수수료 (6.6%)</Form.Label><Form.Control type="text" readOnly style={{ color: 'red' }} value={amount ? formatCurrency(parseFloat(amount) * COMMISSION_RATE) + ' 원' : '0.00 원'} /></Form.Group></Col>
+        </Row>
+        <Row>
+          <Col md={4}><Form.Group class="mb-3"><Form.Label>송금액 (90.1%)</Form.Label><Form.Control type="text" readOnly style={{ color: 'red' }} value={amount ? formatCurrency(parseFloat(amount) * REMITTANCE_RATE) + ' 원' : '0.00 원'} /></Form.Group></Col>
+          <Col md={4}><Form.Group class="mb-3"><Form.Label>수익 (3.3%)</Form.Label><Form.Control type="text" readOnly style={{ color: 'red' }} value={amount ? formatCurrency(parseFloat(amount) * PROFIT_RATE) + ' 원' : '0.00 원'} /></Form.Group></Col>
+          <Col md={4}><Form.Group class="mb-3"><Form.Label>보너스 (0.9%)</Form.Label><Form.Control type="text" readOnly style={{ color: 'red' }} value={amount ? formatCurrency(parseFloat(amount) * BONUS_RATE) + ' 원' : '0.00 원'} /></Form.Group></Col>
+        </Row>
+      </Modal.Body>
+      <Modal.Footer>
+        <Button variant="secondary" onClick={onHide}>취소</Button>
+        <Button variant="primary" onClick={handleSave}>저장</Button>
+      </Modal.Footer>
+    </Modal>
+  );
+};
+
+function Sales() {
+  const [sales, setSales] = useState([]);
+  const [filteredSales, setFilteredSales] = useState([]);
+  const [filterType, setFilterType] = useState('all');
+  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
+  const [showModal, setShowModal] = useState(false);
+  const [editingSale, setEditingSale] = useState(null);
+
+  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
+
+  useEffect(() => {
+    const handleResize = () => setWindowWidth(window.innerWidth);
+    window.addEventListener('resize', handleResize);
+    return () => window.removeEventListener('resize', handleResize);
+  }, []);
+
+  useEffect(() => {
+    const savedSales = localStorage.getItem('sales');
+    if (savedSales) setSales(JSON.parse(savedSales));
+  }, []);
+
+  useEffect(() => {
+    let result = sales;
+    const filterDate = new Date(selectedDate);
+    switch (filterType) {
+      case 'day': result = sales.filter(s => s.date === selectedDate); break;
+      case 'week':
+        const startOfWeek = getStartOfWeek(filterDate);
+        const endOfWeek = new Date(startOfWeek); endOfWeek.setDate(startOfWeek.getDate() + 6);
+        result = sales.filter(s => { const d = new Date(s.date); return d >= startOfWeek && d <= endOfWeek; });
+        break;
+      case 'month':
+        result = sales.filter(s => { const d = new Date(s.date); return d.getFullYear() === filterDate.getFullYear() && d.getMonth() === filterDate.getMonth(); });
+        break;
+      default: result = sales; break;
+    }
+    setFilteredSales(result);
+  }, [sales, filterType, selectedDate]);
+
+  const handleSaveSale = (saleData) => {
+    let updatedSales;
+    if (saleData.id) {
+      updatedSales = sales.map(s => s.id === saleData.id ? { ...s, ...saleData } : s);
+    } else {
+      const newSale = { ...saleData, id: Date.now() };
+      updatedSales = [...sales, newSale];
+      const savedCustomers = localStorage.getItem('customers') || '[]';
+      const customers = JSON.parse(savedCustomers);
+      if (!customers.some(c => c.phone === newSale.phone)) {
+        const newCustomer = { id: Date.now(), name: newSale.name, phone: newSale.phone, cardNumber: '', bankName: '', accountNumber: '', carrier: '', birthdate: '', pw_hint: '', memo: '' };
+        localStorage.setItem('customers', JSON.stringify([...customers, newCustomer]));
+      }
+    }
+    setSales(updatedSales);
+    localStorage.setItem('sales', JSON.stringify(updatedSales));
+    setShowModal(false);
+    setEditingSale(null);
+  };
+
+  const handleDeleteSale = (saleId) => {
+    if (window.confirm('정말로 이 매출 기록을 삭제하시겠습니까?')) {
+      const updatedSales = sales.filter(s => s.id !== saleId);
+      setSales(updatedSales);
+      localStorage.setItem('sales', JSON.stringify(updatedSales));
+    }
+  };
+
+  const totalAmount = filteredSales.reduce((total, sale) => total + sale.amount, 0);
+  const totalCommission = filteredSales.reduce((total, sale) => total + sale.commission, 0);
+  const totalRemittance = filteredSales.reduce((total, sale) => total + sale.remittance, 0);
+  const totalProfit = filteredSales.reduce((total, sale) => total + sale.profit, 0);
+  const totalBonus = filteredSales.reduce((total, sale) => total + (sale.bonus || 0), 0);
+
+  const isMobile = windowWidth < 768;
+
+  return (
+    <Container class="mt-4">
+      <Card class="card-custom">
+        <Card.Body>
+          <Row class="align-items-center mb-3">
+            <Col><h2>매출 목록</h2></Col>
+            <Col class="text-end"><Button onClick={() => { setEditingSale(null); setShowModal(true); }} class="icon-text"><PlusCircleFill /> 신규 매출 기록</Button></Col>
+          </Row>
+          <Form class="mb-3 p-3 border rounded">
+            <Row class="align-items-end">
+              <Col md={4}><Form.Group controlId="filterDate"><Form.Label>날짜 선택</Form.Label><Form.Control type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} /></Form.Group></Col>
+              <Col md={4}><Form.Group controlId="filterType"><Form.Label>검색 단위</Form.Label><Form.Select value={filterType} onChange={(e) => setFilterType(e.target.value)}><option value="all">전체</option><option value="day">일별</option><option value="week">주별</option><option value="month">월별</option></Form.Select></Form.Group></Col>
+            </Row>
+          </Form>
+
+          {isMobile ? (
+            <>
+              {filteredSales.map((sale, index) => (
+                <Card key={sale.id} class="mobile-card">
+                  <Card.Body>
+                    <div class="mobile-card-row"><span class="mobile-card-label">날짜:</span> <span class="mobile-card-value">{sale.date}</span></div>
+                    <div class="mobile-card-row"><span class="mobile-card-label">이름:</span> <span class="mobile-card-value">{sale.name}</span></div>
+                    <div class="mobile-card-row"><span class="mobile-card-label">전화번호:</span> <span class="mobile-card-value">{sale.phone}</span></div>
+                    <div class="mobile-card-row"><span class="mobile-card-label">결제금액:</span> <span class="mobile-card-value">{formatCurrency(sale.amount)} 원</span></div>
+                    <div class="mobile-card-row"><span class="mobile-card-label">수수료:</span> <span class="mobile-card-value">{formatCurrency(sale.commission)} 원</span></div>
+                    <div class="mobile-card-row"><span class="mobile-card-label">송금액:</span> <span class="mobile-card-value">{formatCurrency(sale.remittance)} 원</span></div>
+                    <div class="mobile-card-row"><span class="mobile-card-label">수익:</span> <span class="mobile-card-value">{formatCurrency(sale.profit)} 원</span></div>
+                    <div class="mobile-card-row"><span class="mobile-card-label">보너스:</span> <span class="mobile-card-value">{formatCurrency(sale.bonus)} 원</span></div>
+                    <div class="d-flex justify-content-end mt-2">
+                      <ButtonGroup size="sm">
+                        <Button variant="outline-secondary" onClick={() => { setEditingSale(sale); setShowModal(true); }} class="icon-text"><PencilFill /></Button>
+                        <Button variant="outline-danger" onClick={() => handleDeleteSale(sale.id)} class="icon-text"><TrashFill /></Button>
+                      </ButtonGroup>
+                    </div>
+                  </Card.Body>
+                </Card>
+              ))}
+              {filteredSales.length > 0 && (
+                <Card class="mobile-totals-card">
+                  <Card.Body>
+                    <div class="mobile-card-row"><span class="mobile-card-label">총 결제금액:</span> <span class="mobile-card-value">{formatCurrency(totalAmount)} 원</span></div>
+                    <div class="mobile-card-row"><span class="mobile-card-label">총 수수료:</span> <span class="mobile-card-value">{formatCurrency(totalCommission)} 원</span></div>
+                    <div class="mobile-card-row"><span class="mobile-card-label">총 송금액:</span> <span class="mobile-card-value">{formatCurrency(totalRemittance)} 원</span></div>
+                    <div class="mobile-card-row"><span class="mobile-card-label">총 수익:</span> <span class="mobile-card-value">{formatCurrency(totalProfit)} 원</span></div>
+                    <div class="mobile-card-row"><span class="mobile-card-label">총 보너스:</span> <span class="mobile-card-value">{formatCurrency(totalBonus)} 원</span></div>
+                  </Card.Body>
+                </Card>
+              )}
+            </>
+          ) : (
+            <Table striped bordered hover responsive>
+              <thead class="table-header-custom">
+                <tr><th>#</th><th>날짜</th><th>이름</th><th>전화번호</th><th>결제금액</th><th>수수료</th><th>송금액</th><th>수익</th><th>보너스</th><th>관리</th></tr>
+              </thead>
+              <tbody>
+                {filteredSales.map((sale, index) => (
+                  <tr key={sale.id}>
+                    <td>{index + 1}</td><td>{sale.date}</td><td>{sale.name}</td><td>{sale.phone}</td><td>{formatCurrency(sale.amount)} 원</td><td>{formatCurrency(sale.commission)} 원</td><td>{formatCurrency(sale.remittance)} 원</td><td>{formatCurrency(sale.profit)} 원</td><td>{formatCurrency(sale.bonus)} 원</td>
+                    <td>
+                      <ButtonGroup size="sm">
+                        <Button variant="outline-secondary" onClick={() => { setEditingSale(sale); setShowModal(true); }} class="icon-text"><PencilFill /></Button>
+                        <Button variant="outline-danger" onClick={() => handleDeleteSale(sale.id)} class="icon-text"><TrashFill /></Button>
+                      </ButtonGroup>
+                    </td>
+                  </tr>
+                ))}
+              </tbody>
+              <tfoot>
+                <tr>
+                  <td colSpan="4" class="text-end"><strong>총계</strong></td><td><strong>{formatCurrency(totalAmount)} 원</strong></td><td><strong>{formatCurrency(totalCommission)} 원</strong></td><td><strong>{formatCurrency(totalRemittance)} 원</strong></td><td><strong>{formatCurrency(totalProfit)} 원</strong></td><td><strong>{formatCurrency(totalBonus)} 원</strong></td><td></td>
+                </tr>
+              </tfoot>
+            </Table>
+          )}
+        </Card.Body>
+      </Card>
+      <SaleModal show={showModal} onHide={() => setShowModal(false)} onSave={handleSaveSale} sale={editingSale} />
+    </Container>
+  );
+}
+
+export default Sales;
\ No newline at end of file
diff --git a/test.txt b/test.txt
new file mode 100644
index 0000000..af27ff4
--- /dev/null
+++ b/test.txt
@@ -0,0 +1 @@
+This is a test file.
\ No newline at end of file

```
