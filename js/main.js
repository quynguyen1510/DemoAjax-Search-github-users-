$(document).ready(function(){
	$('#searchUser').on('keyup',function(event){
		let username = event.target.value;

		//Make request to github
		$.ajax({
			url:'https://api.github.com/users/' + username,
			data:{
				client_id: '57734ffb4e4ab5134627',
				client_secret: '0bd4898590c8973f69f400fbd6be75e8fcbd1661'
			}
		}).done(function(user){
			$.ajax({
				url:'https://api.github.com/users/' + username +'/repos',
			data:{
				client_id: '57734ffb4e4ab5134627',
				client_secret: '0bd4898590c8973f69f400fbd6be75e8fcbd1661',
				sort:'create: asc',
				per_page: 5
			}
			}).done(function(repos){
				$.each(repos,function(index , repo){
					$('#repos').append(`
						<div class="well">
							<div class="row">
								<div class="col-md-7">
									<p>${repo.name}</p>
								</div>
								<div class="col-md-5">
									<a href="${repo.html_url}" target="_blank" class="btn btn-default">
									View Repo
									</a>
								</div>
							</div>
						</div>
					`);
				});
			});
			$('#profile').html(`
				<div class="panel panel-default ml-5 mr-5 mt-5">
					<div class="panel-heading">
						<h3 class="panel-title">${user.name}</h3>
					</div>
					<div class="panel-body">
						<div class="row">
							<div class="col-md-3">
								<img class="thumbnail avatar" src="${user.avatar_url}" >
								<a href="${user.html_url}" target="_blank" class="btn btn-success btn-block mt-2" id="btnViewProfile">View profile</a>
							</div>
							<div class="col-md-9">
								<span class="label label-default mr-2">Public repo : ${user.public_repos}</span>
								<span class="label label-primary mr-2">Followers : ${user.followers}</span>
								<span class="label label-danger mr-2">Following : ${user.following}</span>
								<br><br>
								<ul class="list-group">
									<li class="list-group-item">Email : ${user.email}</li>
									<li class="list-group-item">Company : ${user.company}</li>
									<li class="list-group-item">Blog : ${user.Blog}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<h3 class="page-header ml-5 mt-5">Latest repo</h3>
				<div class="ml-5" id="repos">
				</div>
			`);
		});
	});
});