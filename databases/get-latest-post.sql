SELECT posts.*, group_concat(tag.name) as tags
FROM posts
INNER JOIN posts_tags_tag
ON posts_tags_tag.postsId = posts.id
inner join tag on posts_tags_tag.tagId = tag.id
group by posts.id
order by posts.id desc
limit 0, 10;