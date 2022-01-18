1. Nothing is to be committed to main directly
2. When a new branch is created is must be assigned to a set of jira tickets provided in the first commit message
3. Every commit must be one of four things and should be committed in this order
	1. A created test
	2. Code passing the previously created test
	3. The responder to test/code pair
	4. Additional documentation notes/documentation as needed
4. Once those 4 commits have been made to the branch it must be merged into main
5. You must create a pull request to merge back into main and must have another team member approve it
6. As the approver for a pull request you are responsible for ensuring the tests are complete and passing
7. The pull request should have the jira tickets from the first commit included and insured that the issues have been moved to done
8. In the event of a merge conflict the approver is responsible for resolving the conflict and insuring all tests are still passing
	1. If you do not feel comfortable resolving a merge conflict contact the repo admin or call all team members to a meeting