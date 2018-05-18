# Relational Finite State Machine

This project is a PoC in order to create a `Relational Extendable Menu` component. Even though we have built it as generically as possible, it fits to our needs. The relations in this example means that, the relationship between ancestor and its descendants must be clear in order to filter through children of the descendants.

# Developers

This project is built in collaboration with [Rames Aliyev](http://github.com/ramesaliyev).

# Example

Consider that you have the following states

```
S1 S2 S3 S4

A1 A2 A3 A4

B1 B2 B3 B4

D1 D2
```

```
S1, S2 -> A1, A2, A3 -> B1, B2 -> D1 -> END
S1, S2 -> A4 -> B1, B2 -> D2 -> END
S3, S4 -> A1, A2, A3 -> B1, B2 -> D2 -> END
S3, S4 -> A1, A2, A3 -> B3, B4 -> END
S3, S4 -> A4 -> B1, B2 -> END
S3, S4 -> A4 -> B3, B4 -> D1 -> END
S3, S4 -> D2 -> END
