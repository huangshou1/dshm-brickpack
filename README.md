# dshm-brickpack

Deliberately broken dsh plugin packages for testing a rescue plugin's ability to
detect and recover from startup plugin-load failures. Every defect is intentional.
Do not fix the defects and do not add behavior.

Install form (one variant per install):

    github:<owner>/dshm-brickpack#main&path:/<variant-dir>

Variant inventory
=================

v00-control
  directory:   v00-control
  package name: v00-control
  row id:       v00-control
  defect:       none; empty apply (negative control)
  expected:     normal activation; no failure text

v01-pending-single
  directory:   v01-pending-single
  package name: v01-pending-single
  row id:       v01-pending-single
  defect:       injects nonexistent service dshm-brickpack-no-such-service-a
  expected:     pending at startup assembly; waiting for service

v02-pending-multi
  directory:   v02-pending-multi
  package name: v02-pending-multi
  row id:       v02-pending-multi
  defect:       injects nonexistent services dshm-brickpack-no-such-service-c and
                dshm-brickpack-no-such-service-d
  expected:     pending at startup assembly; failure text may list both services

v03-throw-sync
  directory:   v03-throw-sync
  package name: v03-throw-sync
  row id:       v03-throw-sync
  defect:       apply throws synchronously
  expected:     activation failure; deliberate sync throw text

v04-throw-async
  directory:   v04-throw-async
  package name: v04-throw-async
  row id:       v04-throw-async
  defect:       apply returns an immediately rejected Promise
  expected:     if awaited: activation failure; if not awaited: possible host
                process-level crash and DSHM self-heal (row file quarantined).
                Record both outcomes.

v05-import-missing-local
  directory:   v05-import-missing-local
  package name: v05-import-missing-local
  row id:       v05-import-missing-local
  defect:       top-level import './does-not-exist.js' (file absent)
  expected:     import failed / module-not-found. May be blocked by install-time
                validation; generated as specified.

v06-import-missing-bare
  directory:   v06-import-missing-bare
  package name: v06-import-missing-bare
  row id:       v06-import-missing-bare
  defect:       top-level import 'dshm-brickpack-no-such-package' (package absent)
  expected:     import failed / module-not-found for a bare specifier. May be
                blocked by install-time validation; generated as specified.

v07-syntax-error
  directory:   v07-syntax-error
  package name: v07-syntax-error
  row id:       v07-syntax-error
  defect:       one deliberate syntax error in lib/index.js, marked by comment
  expected:     parse failure / SyntaxError. May be blocked by install-time
                validation; generated as specified.

v08-rowid-dotted
  directory:   v08-rowid-dotted
  package name: brickpack.dotted.v08
  row id:       brickpack.dotted.v08
  defect:       dotted row id; injects nonexistent service
                dshm-brickpack-no-such-service-e
  expected:     pending; exercises failure-text name-to-row-id mapping. If the
                installer rejects the dotted name, record it as an install-time
                boundary, not a variant defect.

v09-rowid-scoped
  directory:   v09-rowid-scoped
  package name: @brickpack/scoped-v09
  row id:       @brickpack/scoped-v09
  defect:       scoped name and row id; injects nonexistent service
                dshm-brickpack-no-such-service-f
  expected:     pending; exercises YAML quoting for recovery-side writes (both
                YAML values are single-quoted). If the installer rejects the
                scoped name, record it as an install-time boundary, not a
                variant defect.

v10-client-broken
  directory:   v10-client-broken
  package name: v10-client-broken
  row id:       v10-client-broken
  defect:       host half is normal; client half lib/client.js has a top-level
                import of nonexistent bare package
                dshm-brickpack-no-such-client-package
  expected:     host half activates normally; client bundle loading fails
                (module-resolution error if loaded as a module; script syntax
                error if loaded as a classic script)
  note:         client half is declared with dsh.client.platform=web and
                exports["./client"], following the DSH-bundled
                cordis-plugin-development/templates/decoration package. This is
                the only variant with a fourth file.

Notes
=====

- v05, v06, and v07 may be rejected by install-time validation. They are still
  generated exactly as specified.
- v08 and v09 may be rejected by the installer because of their names. Treat
  that as install-time boundary information, not as a defect in the variant.
- The v10 client declaration format is taken from the DSH-bundled plugin
  template; it has not been installed or run here.
