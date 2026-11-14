# Release Procedure

TG-WO-2026-004 · November 14, 2026

Compare the approved JavaScript hash to the installed resource. For a future approved update, save the previous JS and card YAML, stage exactly one resource in test and use a distinct URL or version query to avoid stale cached bytes. Read back the served JS and check it in a refreshed browser. Back out by restoring the prior resource and YAML together and refreshing. No HACS or GitHub release assets were found. For approved patches retain the Git commit, artifact hash, prior copy and test results.
