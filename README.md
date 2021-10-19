# Coding challenge

## Description

Components of computer systems often have dependencies (i.e., other components that must be installed before the systems function properly). These dependencies are frequently shared by multiple components. For example, both the TELNET client program and the FTP client program require that the TCP/IP networking software be installed before they can operate. If you install TCP/IP and the TELNET client program, and later decide to add the FTP client program, you do not need to reinstall TCP/IP.

For some components, it would not be a problem if the components on which they depended were reinstalled; it would just waste some resources. For other components (e.g., TCP/IP), some component configuration may be destroyed if the component were reinstalled.

It is useful to be able to remove components that are no longer needed. When this is done, components that only support the removed component may also be removed, which frees up disk space, memory, and other resources. A supporting component that is not explicitly installed may be removed only if all components that depend on it are also removed. For example, removing the FTP client program and TCP/IP would mean the TELNET client program, which was not removed, would no longer operate. Likewise, removing TCP/IP by itself would cause the failure of both the TELNET and the FTP client programs. Also, if we installed TCP/IP to support our own development, then installed the TELNET client (which depends on TCP/IP), and then still later removed the TELNET client, we would not want TCP/IP to be removed.

Dependence is transitive. For example, if A depends on B, and B depends on C, both B and C are implicitly installed when A is explicitly installed. Conversely, B and C would both be removed if A is subsequently removed. We need a program to automate the process of adding and removing components. To do this, we will maintain a record of installed components and component dependencies. A component can be installed explicitly in response to a command (unless it has already been explicitly installed), or implicitly if it is needed by some other component being installed. A component can be explicitly removed in response to a command (if it is not needed to support other components) or implicitly removed if it is no longer needed to support another component (and has not been explicitly installed).

## Usage

### Install

```
npm install
```

### Development

1. Run script

```
npm run start
```

### Sample input

The input will contain a sequence of commands (as described below), each on a separate line that contains no more than 80 characters.

- Item names are case sensitive, and each is no longer than 10 characters.
- The command names (DEPEND, INSTALL, REMOVE, and LIST) always appear in uppercase starting in column one.
- Item names are separated from the command name and each other by one or more spaces.
- All appropriate DEPEND commands will appear before the occurrence of any INSTALL dependencies.
- The end of the input is marked by a line that contains only the word END.

Command Syntax Interpretation/Response DEPEND item1 item2 [item3...]item1 depends on item2 (and item3 ...)INSTALL item1 install item1 and those on which it dependsREMOVE item1remove item1, and those on which it depends, if possible.

LIST list the names of all currently-installed components *

```js
  'DEPEND TELNET TCPIP NETCARD',
  'DEPEND TCPIP NETCARD',
  'DEPEND NETCARD TCPIP',
  'DEPEND DNS TCPIP NETCARD',
  'DEPEND BROWSER TCPIP HTML',
  'INSTALL NETCARD',
  'INSTALL TELNET',
  'INSTALL foo',
  'REMOVE NETCARD',
  'INSTALL BROWSER',
  'INSTALL DNS',
  'LIST',
  'REMOVE TELNET',
  'REMOVE NETCARD',
  'REMOVE DNS',
  'REMOVE NETCARD',
  'INSTALL NETCARD',
  'REMOVE TCPIP',
  'REMOVE BROWSER',
  'REMOVE TCPIP',
  'LIST',
  'END',
```

### Sample output

```node
DEPEND TELNET TCPIP NETCARD

DEPEND TCPIP NETCARD

DEPEND NETCARD TCPIP

TCPIP depends on NETCARD, ignoring command

DEPEND DNS TCPIP NETCARD

DEPEND BROWSER TCPIP HTML

INSTALL NETCARD

Installing NETCARD

INSTALL TELNET

Installing TCPIP

Installing TELNET

INSTALL foo

Installing foo

REMOVE NETCARD

NETCARD is still needed

INSTALL BROWSER

Installing HTML

Installing BROWSER

INSTALL DNS

Installing DNS

LIST

NETCARD

TCPIP

TELNET

foo

HTML

BROWSER

DNS

REMOVE TELNET

Removing TELNET

REMOVE NETCARD

NETCARD is still needed

REMOVE DNS

Removing DNS

REMOVE NETCARD

NETCARD is still needed

INSTALL NETCARD

NETCARD is already installed

REMOVE TCPIP

TCPIP is still needed

REMOVE BROWSER

Removing BROWSER

Removing TCPIP

Removing HTML

REMOVE TCPIP

TCPIP is not installed

LIST

NETCARD

foo

END
```

### Tests

```npm
npm test
```

## Author

[@carobamarillo](https://github.com/carobamarillo)
